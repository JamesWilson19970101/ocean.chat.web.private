/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest';

import { useChatStore } from './useChatStore';

describe('useChatStore Logic', () => {
  beforeEach(() => {
    useChatStore.getState().setCurrentUserId('user-123');
    // Clear messages manually
    useChatStore.setState({ messages: [] });
  });

  it('should correctly determine isOwn and deduplicate messages', () => {
    const store = useChatStore.getState();

    // 1. Add optimistic message (Me)
    const optimisticMsg = {
      client_msg_id: 'uuid-1',
      sender_id: 'user-123',
      send_status: 'SENDING' as const,
      created_at: 1000,
      group_id: 'room-1',
      content: 'Hello',
      msg_type: 1,
    };
    store.appendMessages([optimisticMsg as any]);

    // 2. Receive synced message (Same ID, status correction)
    const syncedMsg = {
      client_msg_id: 'uuid-1',
      sender_id: 'user-123',
      send_status: 'SENT' as const,
      created_at: 1000,
      sync_seq_id: 500,
      group_id: 'room-1',
      content: 'Hello',
      msg_type: 1,
    };
    store.appendMessages([syncedMsg as any]);

    const state = useChatStore.getState();
    expect(state.messages.length).toBe(1);
    expect(state.messages[0].send_status).toBe('SENT');
    expect(state.messages[0].sync_seq_id).toBe(500);
  });

  it('should sort messages by sync_seq_id primarily', () => {
    const store = useChatStore.getState();
    const msgs = [
      {
        client_msg_id: 'a',
        sync_seq_id: 100,
        created_at: 2000,
        sender_id: 'u2',
        msg_type: 1,
      },
      {
        client_msg_id: 'b',
        sync_seq_id: 50,
        created_at: 1000,
        sender_id: 'u2',
        msg_type: 1,
      },
      {
        client_msg_id: 'c',
        created_at: 3000,
        sender_id: 'user-123',
        msg_type: 1,
      }, // Optimistic
    ];

    store.appendMessages(msgs as any);
    const sorted = useChatStore.getState().messages;

    expect(sorted[0].client_msg_id).toBe('b'); // seq 50
    expect(sorted[1].client_msg_id).toBe('a'); // seq 100
    expect(sorted[2].client_msg_id).toBe('c'); // optimistic (Infinity seq)
  });
});
