import { API_ROUTES } from '@/constants/api-routes';
import { httpClient } from '@/services/http/client';

import { ChatMessage, localDB } from '../storage/db';

import { oceanchat } from './proto/monkey';

/**
 * The `SyncEngine` is responsible for coordinating the synchronization of messages
 * between the server and the local database. It handles incoming push notifications,
 * debounces sync requests, and fetches missing messages via the HTTP API to ensure
 * the local state is eventually consistent and up-to-date.
 */
export class SyncEngine {
  /**
   * Timer used to debounce incoming `MSG_NOTIFY` events to prevent excessive API calls.
   * @private
   */
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  /**
   * The highest `syncSeqId` received from incoming notifications.
   * Used to determine if a fetch from the server is necessary.
   * @private
   */
  private pendingMaxSeqId: bigint = BigInt(0);
  /**
   * Flag indicating whether a synchronization process is currently active.
   * @private
   */
  private isSyncing: boolean = false;
  /**
   * Flag indicating whether a synchronization process is currently active.
   * @private
   */
  private hasPendingSync: boolean = false;

  /**
   * Callback triggered when new messages are successfully synced and verified.
   * Typically used to notify the application state (e.g., Zustand store) to update the UI.
   *
   * @param newMessages - An array of newly synced and processed messages.
   * @public
   */
  public onSyncComplete?: (newMessages: ChatMessage[]) => void;

  /**
   * Processes an incoming `MSG_NOTIFY` push frame from the `SocketManager`.
   *
   * Updates the `pendingMaxSeqId` and schedules a synchronization process.
   * Uses a 200ms debounce window to micro-batch notifications.
   *
   * @param notify - The notification payload containing the latest `syncSeqId` from the server.
   * @public
   */
  public handleNotify(notify: oceanchat.monkey.MsgNotify) {
    const incomingSeqId = BigInt(notify.syncSeqId?.toString() ?? '0');
    if (incomingSeqId > this.pendingMaxSeqId) {
      this.pendingMaxSeqId = incomingSeqId;
    }

    if (!this.debounceTimer) {
      this.debounceTimer = setTimeout(() => {
        this.debounceTimer = null;
        this.triggerSync();
      }, 200);
    }
  }

  /**
   * Initiates the synchronization process.
   *
   * Compares the local maximum sequence ID with the pending target. If the local state
   * is outdated, it fetches the missing messages from the HTTP API, processes them through
   * the local database, and fires the `onSyncComplete` callback.
   * This method is also useful to call manually when reconnecting (e.g., after `AUTH_ACK`).
   *
   * @public
   * @returns A Promise that resolves when the synchronization process is complete.
   */
  public async triggerSync() {
    if (this.isSyncing) {
      this.hasPendingSync = true;
      return;
    }
    this.isSyncing = true;
    this.hasPendingSync = false;

    try {
      const maxLocal = BigInt(await localDB.getMaxLocalSyncSeqId());

      // If we have a pending target and we already have it, skip
      if (
        this.pendingMaxSeqId > BigInt(0) &&
        maxLocal >= this.pendingMaxSeqId
      ) {
        return;
      }

      // Fetch incremental messages from API
      // The API should return messages strictly greater than maxLocal
      const response = await httpClient.get<ChatMessage[]>(
        API_ROUTES.MESSAGES.SYNC,
        {
          params: { seqId: maxLocal.toString() },
        },
      );

      const newMessages = response.data;
      if (!newMessages || newMessages.length === 0) {
        return;
      }

      // Offload read-modify-write loops into a single DB transaction for extreme performance
      const verifiedMessages =
        await localDB.processSyncMessagesBatch(newMessages);

      // Notify the application layer (Zustand/React)
      if (verifiedMessages.length > 0) {
        if (this.onSyncComplete) {
          this.onSyncComplete(verifiedMessages);
        } else {
          console.warn(
            '[SyncEngine] Synced new messages, but no onSyncComplete handler is registered.',
          );
        }
      }
    } catch (error) {
      console.error('[SyncEngine] Failed to sync messages:', error);
    } finally {
      this.isSyncing = false;
      if (this.hasPendingSync) {
        this.triggerSync();
      }
    }
  }
}
