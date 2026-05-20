import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Cmd, Flags } from './constants';
import { InFlightQueue } from './InFlightQueue';

describe('InFlightQueue (Pure Logic)', () => {
  let queue: InFlightQueue;

  beforeEach(() => {
    queue = new InFlightQueue();
  });

  it('should enqueue and resolve requests', async () => {
    const frameData = {
      cmd: Cmd.MSG_UP,
      flags: Flags.REQUIRE_ACK,
      payload: new Uint8Array(),
      reqId: 101,
    };
    const promise = queue.enqueue(frameData, 101);

    const mockPayload = new Uint8Array([1, 2, 3]);
    queue.resolve(101, mockPayload);

    const result = await promise;
    expect(result).toEqual(mockPayload);
  });

  it('should return pending requests sorted by timestamp', () => {
    const frame1 = {
      cmd: Cmd.MSG_UP,
      flags: Flags.REQUIRE_ACK,
      payload: new Uint8Array(),
      reqId: 1,
    };
    const frame2 = {
      cmd: Cmd.MSG_UP,
      flags: Flags.REQUIRE_ACK,
      payload: new Uint8Array(),
      reqId: 2,
    };

    // Use fake timers or just slight delays if needed, but since we use Map, insertion order is mostly preserved,
    // however our implementation uses explicit timestamp.
    vi.useFakeTimers();

    queue.enqueue(frame1, 1);
    vi.advanceTimersByTime(100);
    queue.enqueue(frame2, 2);

    const pending = queue.getPendingRequests();
    expect(pending[0].reqId).toBe(1);
    expect(pending[1].reqId).toBe(2);

    vi.useRealTimers();
  });

  it('should discard NO_RETRY requests and reject them', async () => {
    const normalFrame = {
      cmd: Cmd.MSG_UP,
      flags: Flags.REQUIRE_ACK,
      payload: new Uint8Array(),
      reqId: 1,
    };
    const volatileFrame = {
      cmd: Cmd.MSG_UP,
      flags: Flags.REQUIRE_ACK | Flags.NO_RETRY,
      payload: new Uint8Array(),
      reqId: 2,
    };

    queue.enqueue(normalFrame, 1);
    const p2 = queue.enqueue(volatileFrame, 2);

    queue.discardNoRetryRequests();

    expect(queue.getPendingRequests().length).toBe(1);
    expect(queue.getPendingRequests()[0].reqId).toBe(1);

    await expect(p2).rejects.toThrow('Discarded due to NO_RETRY');
  });

  it('should clear and reject all requests on intentional disconnect', async () => {
    const promise = queue.enqueue(
      {
        cmd: Cmd.MSG_UP,
        flags: Flags.REQUIRE_ACK,
        payload: new Uint8Array(),
        reqId: 1,
      },
      1,
    );
    queue.clearAndRejectAll(new Error('Logout'));

    await expect(promise).rejects.toThrow('Logout');
    expect(queue.getPendingRequests().length).toBe(0);
  });
});
