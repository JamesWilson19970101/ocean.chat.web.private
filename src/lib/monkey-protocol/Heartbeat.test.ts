import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { Cmd, Flags } from './constants';
import { HeartbeatManager } from './Heartbeat';

describe('HeartbeatManager (Pure Logic)', () => {
  let hb: HeartbeatManager;
  const sendFrame = vi.fn();
  const onDeadTimeout = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    hb = new HeartbeatManager(sendFrame, onDeadTimeout);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should send PING after 35s and trigger dead timeout after 60s', () => {
    hb.start();

    // 35s check
    vi.advanceTimersByTime(35000);
    expect(sendFrame).toHaveBeenCalledWith(
      expect.objectContaining({ cmd: Cmd.PING }),
    );

    // 60s check
    vi.advanceTimersByTime(25000); // 35 + 25 = 60
    expect(onDeadTimeout).toHaveBeenCalled();
  });

  it('should reset timers on network activity (Implicit Heartbeat)', () => {
    hb.start();

    // Advance 30s
    vi.advanceTimersByTime(30000);

    // Trigger activity
    hb.onActivity();

    // If it didn't reset, PING would fire at 35s (5s from now).
    // It should now fire 35s from the activity.
    vi.advanceTimersByTime(10);
    expect(sendFrame).not.toHaveBeenCalled();

    vi.advanceTimersByTime(34990);
    expect(sendFrame).toHaveBeenCalled();
  });

  it('should respond with PONG immediately when receiving PING', () => {
    hb.start();
    hb.onReceivePing();

    expect(sendFrame).toHaveBeenCalledWith(
      expect.objectContaining({ cmd: Cmd.PONG }),
    );
  });
});
