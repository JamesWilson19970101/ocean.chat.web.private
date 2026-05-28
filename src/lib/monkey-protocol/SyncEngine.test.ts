/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { httpClient } from '@/services/http/client';

import { localDB, ChatMessage } from '../storage/db';

import { oceanchat } from './proto/monkey';
import { SyncEngine } from './SyncEngine';

// Mock dependencies
vi.mock('../storage/db', () => ({
  localDB: {
    getMaxLocalSyncSeqIdByGroupId: vi.fn(),
    processSyncMessagesBatch: vi.fn(),
  },
}));

vi.mock('@/services/http/client', () => ({
  httpClient: {
    get: vi.fn(),
  },
}));

describe('SyncEngine (Pure Logic)', () => {
  let engine: SyncEngine;

  beforeEach(() => {
    engine = new SyncEngine();
    vi.clearAllMocks();
  });

  it('should debounce MSG_NOTIFY and trigger sync only once', async () => {
    vi.useFakeTimers();
    const triggerSyncSpy = vi
      .spyOn(engine, 'triggerSync')
      .mockResolvedValue(undefined);

    engine.handleNotify({
      groupId: 'g1',
      syncSeqId: 100,
    } as unknown as oceanchat.monkey.MsgNotify);
    engine.handleNotify({
      groupId: 'g1',
      syncSeqId: 105,
    } as unknown as oceanchat.monkey.MsgNotify);
    engine.handleNotify({
      groupId: 'g1',
      syncSeqId: 102,
    } as unknown as oceanchat.monkey.MsgNotify);

    vi.advanceTimersByTime(200);

    expect(triggerSyncSpy).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('should pull messages and process them via batch transaction', async () => {
    vi.mocked(localDB.getMaxLocalSyncSeqIdByGroupId).mockResolvedValue(1000);

    const mockMessages = [
      { client_msg_id: 'msg-1', sync_seq_id: 1001, content: 'Hello' },
    ];
    vi.mocked(httpClient.get).mockResolvedValue({ data: mockMessages });

    // Mock batch processor to return the same messages as "verified"
    vi.mocked(localDB.processSyncMessagesBatch).mockResolvedValue(
      mockMessages as any,
    );

    const onSyncComplete = vi.fn();
    engine.onSyncComplete = onSyncComplete;

    await engine.triggerSync('g1');

    // Verify batch processing was used
    expect(localDB.processSyncMessagesBatch).toHaveBeenCalledWith(mockMessages);
    expect(onSyncComplete).toHaveBeenCalledWith(mockMessages);
  });
});
