import { openDB, DBSchema, IDBPDatabase } from 'idb';

import { pb } from '../monkey-protocol';

export type SendStatus = 'SENDING' | 'SENT' | 'FAILED';

export interface ChatMessage {
  client_msg_id: string; // UUIDv7
  sync_seq_id?: number; // 64-bit ID from server
  sender_id: string; // Added for dynamic isOwn check
  send_status: SendStatus;
  created_at: number;
  group_id: string;
  msg_type: pb.oceanchat.monkey.MsgUp.MsgType;

  // Message payload contents (unified from Protobuf)
  content?: string;
  url?: string;
  width?: number;
  height?: number;
  size?: number;
  format?: string;
  duration?: number;
  file_name?: string;
  extension?: string;
  thumbnail_url?: string;
}

interface OceanChatDB extends DBSchema {
  messages: {
    key: string;
    value: ChatMessage;
    indexes: {
      'by-sync-seq': number;
      'by-group': string;
    };
  };
  metadata: {
    key: string;
    value: unknown;
  };
}

const DB_NAME = 'ocean_chat_db';
const DB_VERSION = 1;

// TODO: loadMessagesFromDB currently fetches all messages for a group.
// This will cause browser tabs to crash or UI to freeze as message history grows into the thousands.
// Implement virtualization and cursor-based pagination in localDB.getMessagesByGroupId and the UI layer immediately.
class StorageManager {
  private dbPromise: Promise<IDBPDatabase<OceanChatDB>> | null = null;

  private init() {
    // Prevent IndexedDB execution during SSR (Next.js server)
    if (typeof window === 'undefined') return null;

    this.dbPromise = openDB<OceanChatDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('messages')) {
          const store = db.createObjectStore('messages', {
            keyPath: 'client_msg_id',
          });
          store.createIndex('by-sync-seq', 'sync_seq_id');
          store.createIndex('by-group', 'group_id');
        }
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata');
        }
      },
    });
    return this.dbPromise;
  }

  /**
   * Lazy-loads the database instance.
   */
  async getDB() {
    if (!this.dbPromise) {
      return this.init();
    }
    return this.dbPromise;
  }

  async saveMessage(msg: ChatMessage) {
    const db = await this.getDB();
    if (!db) return;
    await db.put('messages', msg);
  }

  async getMessage(clientMsgId: string) {
    const db = await this.getDB();
    if (!db) return null;
    return db.get('messages', clientMsgId);
  }

  /**
   * Retrieves messages for a specific group using the index.
   * Efficiently filters by groupId at the database level.
   */
  async getMessagesByGroupId(groupId: string): Promise<ChatMessage[]> {
    const db = await this.getDB();
    if (!db) return [];
    return db.getAllFromIndex('messages', 'by-group', groupId);
  }

  async updateMessageStatus(
    clientMsgId: string,
    status: SendStatus,
    syncSeqId?: number,
  ) {
    const db = await this.getDB();
    if (!db) return;

    const tx = db.transaction('messages', 'readwrite');
    const store = tx.objectStore('messages');
    const msg = await store.get(clientMsgId);

    if (msg) {
      msg.send_status = status;
      // for Optimistic UI
      if (syncSeqId !== undefined) {
        msg.sync_seq_id = syncSeqId;
      }
      await store.put(msg);
    }
    await tx.done;
  }

  async updateMessageContent(clientMsgId: string, newContent: string) {
    const db = await this.getDB();
    if (!db) return;

    const tx = db.transaction('messages', 'readwrite');
    const store = tx.objectStore('messages');
    const msg = await store.get(clientMsgId);

    if (msg) {
      msg.content = newContent;
      await store.put(msg);
    }
    await tx.done;
  }

  // TODO: getMaxGlobalSyncSeqId Incremental updates when first entering the chat interface
  /**
   * Retrieves the maximum sync_seq_id from the local database for a specific group.
   * Used as the cursor for HTTP incremental sync (MaxLocalSyncSeqId) per room.
   */
  async getMaxLocalSyncSeqIdByGroupId(groupId: string): Promise<number> {
    const db = await this.getDB();
    if (!db) return 0;

    // Open a readonly transaction
    const tx = db.transaction('messages', 'readonly');
    const store = tx.objectStore('messages');

    // Using the 'by-group' index to get all messages for the group
    // In IndexedDB, if we want max sync_seq_id, we either need a compound index [group_id, sync_seq_id]
    // or we fetch all and find the max. For client side, fetching all for a single group and finding max is fast enough
    // before we introduce full virtualization.
    const messages = await store.index('by-group').getAll(groupId);

    if (messages.length === 0) return 0;

    let maxId = 0;
    for (const msg of messages) {
      if (msg.sync_seq_id && msg.sync_seq_id > maxId) {
        maxId = msg.sync_seq_id;
      }
    }

    return maxId;
  }

  /**
   * Efficiently processes a batch of incoming messages from a sync operation.
   * Uses a single readwrite transaction to check existence and save/update messages.
   * Returns the list of actually processed (new or updated) messages.
   */
  async processSyncMessagesBatch(
    newMessages: ChatMessage[],
  ): Promise<ChatMessage[]> {
    const db = await this.getDB();
    if (!db) return [];

    const tx = db.transaction('messages', 'readwrite');
    const store = tx.objectStore('messages');
    const verifiedMessages: ChatMessage[] = [];

    for (const msg of newMessages) {
      const existing = await store.get(msg.client_msg_id);

      if (existing) {
        if (existing.send_status === 'SENDING') {
          existing.send_status = 'SENT';
          existing.sync_seq_id = msg.sync_seq_id!;
          await store.put(existing);
          verifiedMessages.push(existing);
        }
      } else {
        const incomingMsg = { ...msg, send_status: 'SENT' as const };
        await store.put(incomingMsg);
        verifiedMessages.push(incomingMsg);
      }
    }

    await tx.done; // Wait for the single bulk transaction to complete
    return verifiedMessages;
  }

  async setMetadata(key: string, value: unknown) {
    const db = await this.getDB();
    if (!db) return;
    await db.put('metadata', value, key);
  }

  async getMetadata(key: string): Promise<unknown> {
    const db = await this.getDB();
    if (!db) return null;
    return db.get('metadata', key);
  }
}

export const localDB = new StorageManager();
