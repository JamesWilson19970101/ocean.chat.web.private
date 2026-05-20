import { create } from 'zustand';

import { ChatMessage, localDB } from '@/lib/storage/db';

interface ChatState {
  messages: ChatMessage[];
  currentUserId: string | null;

  // Actions
  setCurrentUserId: (userId: string | null) => void;
  appendMessages: (newMessages: ChatMessage[]) => void;
  loadMessagesFromDB: (groupId: string) => Promise<void>;
  addOptimisticMessage: (msg: ChatMessage) => Promise<void>;
  markMessageFailed: (clientMsgId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  currentUserId: null,

  setCurrentUserId: (userId) => set({ currentUserId: userId }),

  appendMessages: (newMessages) =>
    set((state) => {
      // TODO: Performance bottleneck - O(N*logN) merge and sort complexity.
      // When `state.messages` contains a massive number of messages (e.g., 10k+),
      // recreating the Map and re-sorting the entire array on every new message
      // causes unnecessary CPU overhead and memory churn.
      //
      // Optimization Plan:
      // 1. Incremental Update: Use binary search (O(logN)) to find the correct
      //    insertion index for new messages instead of re-sorting.
      // 2. In-place Update: For status changes (e.g., SENDING -> SENT), update the
      //    object in-place if its sorting priority (sync_seq_id) hasn't shifted.
      // 3. Synergy with Virtualization: Once virtualization is implemented below,
      //    this array will stay small (e.g. < 200 items), making this approach acceptable.
      // Create a map to ensure we don't have duplicate clientMsgIds in memory
      const msgMap = new Map(state.messages.map((m) => [m.client_msg_id, m]));

      newMessages.forEach((newMsg) => {
        msgMap.set(newMsg.client_msg_id, newMsg);
      });

      // Sort by sync_seq_id or created_at (for optimistic messages)
      const merged = Array.from(msgMap.values()).sort((a, b) => {
        const idA = a.sync_seq_id ?? Infinity;
        const idB = b.sync_seq_id ?? Infinity;
        if (idA === idB) {
          return a.created_at - b.created_at;
        }
        return idA - idB;
      });

      return { messages: merged };
    }),

  // TODO: Performance ceiling - Full data load
  // Currently, this fetches ALL historical messages for a group into memory at once.
  // Loading 10,000+ messages will lead to:
  // 1. Memory Exhaustion: Browser tabs crashing.
  // 2. UI Freezing: React attempting to render thousands of DOM nodes.
  //
  // Optimization Plan: List Virtualization + Pagination
  // 1. DB Layer: Update `localDB.getMessagesByGroupId` to support pagination
  //    (using `limit` and a cursor/offset) to fetch e.g., 50 messages per batch.
  // 2. Store Layer: `state.messages` should only hold the currently rendered window
  //    of messages. Add a `hasMore` state and a `loadMoreMessages` action.
  // 3. UI Layer: Implement a virtualized list (e.g., `react-virtuoso` or `tanstack-virtual`).
  //    When the user scrolls up, trigger `loadMoreMessages` to prepend older records.
  loadMessagesFromDB: async (groupId: string) => {
    // Optimized: Fetch only messages for this group using IndexedDB index
    const groupMsgs = await localDB.getMessagesByGroupId(groupId);

    // Sort by sequence or timestamp
    groupMsgs.sort((a, b) => {
      const idA = a.sync_seq_id ?? Infinity;
      const idB = b.sync_seq_id ?? Infinity;
      if (idA === idB) return a.created_at - b.created_at;
      return idA - idB;
    });

    set({ messages: groupMsgs });
  },

  addOptimisticMessage: async (msg: ChatMessage) => {
    // 1. Save to LocalDB immediately
    await localDB.saveMessage(msg);
    // 2. Append to memory state for instant UI update
    get().appendMessages([msg]);
  },

  markMessageFailed: async (clientMsgId: string) => {
    await localDB.updateMessageStatus(clientMsgId, 'FAILED');
    set((state) => ({
      messages: state.messages.map((m) =>
        m.client_msg_id === clientMsgId ? { ...m, send_status: 'FAILED' } : m,
      ),
    }));
  },
}));
