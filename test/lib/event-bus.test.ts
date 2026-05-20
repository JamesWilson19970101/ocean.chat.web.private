import { describe, it, expect, vi } from 'vitest';

import { appEventBus } from '../../src/lib/event-bus';

describe('EventBus', () => {
  it('should allow subscribing to and receiving events', () => {
    const handler = vi.fn();
    const unsubscribe = appEventBus.on('auth:logout', handler);

    appEventBus.emit('auth:logout', undefined);

    expect(handler).toHaveBeenCalledTimes(1);

    // Unsubscribe and verify it is not called again
    unsubscribe();
    appEventBus.emit('auth:logout', undefined);

    expect(handler).toHaveBeenCalledTimes(1); // Should not increase
  });

  it('should not throw if emitting an event with no subscribers', () => {
    expect(() => {
      appEventBus.emit('auth:logout', undefined);
    }).not.toThrow();
  });
});
