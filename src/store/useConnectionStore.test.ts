import { describe, it, expect, beforeEach } from 'vitest';

import { useConnectionStore } from './useConnectionStore';

describe('useConnectionStore Logic', () => {
  beforeEach(() => {
    useConnectionStore.getState().reset();
  });

  it('should transition from offline to connected and reset retryCount', () => {
    const store = useConnectionStore.getState();
    
    store.setWaiting(5, Date.now() + 1000, new Error('Fail'));
    expect(useConnectionStore.getState().status).toBe('waiting');
    expect(useConnectionStore.getState().retryCount).toBe(5);

    store.setStatus('connected');
    expect(useConnectionStore.getState().status).toBe('connected');
    expect(useConnectionStore.getState().retryCount).toBe(0);
  });

  it('should handle permanent failure state', () => {
    const store = useConnectionStore.getState();
    const error = new Error('Protocol Version Mismatch');
    
    store.setFailed(error);
    expect(useConnectionStore.getState().status).toBe('failed');
    expect(useConnectionStore.getState().lastError).toBe(error);
  });
});
