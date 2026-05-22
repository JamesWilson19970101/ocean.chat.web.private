import { describe, it, expect, beforeEach } from 'vitest';

import { useAuthStore } from './useAuthStore';

describe('useAuthStore Security & Persistence', () => {
  beforeEach(() => {
    useAuthStore.getState().clearAuth();
    localStorage.clear();
  });

  it('should NOT persist token in localStorage (XSS Mitigation)', () => {
    const store = useAuthStore.getState();
    store.setAuth('secret-jwt-token', { _id: 'user-1', username: 'u1' });

    // Manually check localStorage (simulating page reload)
    const stored = JSON.parse(
      localStorage.getItem('ocean-auth-storage') || '{}',
    );

    // Based on partialize logic: only deviceId should be here
    expect(stored.state.user).toBeUndefined();
    expect(stored.state.accessToken).toBeUndefined(); // Crucial security gate
    expect(stored.state.deviceId).toBeDefined();
  });

  it('should clear all state on clearAuth', () => {
    const store = useAuthStore.getState();
    store.setAuth('tk', { _id: 'u1', username: 'u1' });
    store.clearAuth();

    expect(useAuthStore.getState().accessToken).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });
});
