import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './useAuthStore';

describe('useAuthStore Security & Persistence', () => {
  beforeEach(() => {
    useAuthStore.getState().clearAuth();
    localStorage.clear();
  });

  it('should NOT persist token in localStorage (XSS Mitigation)', () => {
    const store = useAuthStore.getState();
    store.setAuth('secret-jwt-token', 'user-1');

    // Manually check localStorage (simulating page reload)
    const stored = JSON.parse(localStorage.getItem('ocean-auth-storage') || '{}');
    
    // Based on partialize logic: only userId and deviceId should be here
    expect(stored.state.userId).toBe('user-1');
    expect(stored.state.token).toBeUndefined(); // Crucial security gate
    expect(stored.state.deviceId).toBeDefined();
  });

  it('should clear all state on clearAuth', () => {
    const store = useAuthStore.getState();
    store.setAuth('tk', 'u1');
    store.clearAuth();

    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().userId).toBeNull();
  });
});
