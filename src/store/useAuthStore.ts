import { v7 as uuidv7 } from 'uuid';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  userId: string | null;
  deviceId: string;
  setAuth: (token: string, userId: string) => void;
  clearAuth: () => void;
}

/**
 * Manages authentication state.
 *
 * IMPORTANT: This store persists the `userId` to localStorage for convenience but
 * intentionally does NOT persist the `token` (Access Token) to mitigate XSS risks.
 * The access token is held in-memory only. The application is expected to
 * re-acquire the token on startup (e.g., via a refresh token flow).
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      deviceId: `web-${uuidv7()}`,
      setAuth: (token, userId) => set({ token, userId }), // Token is now only in-memory
      clearAuth: () => set({ token: null, userId: null }), // Clears both in-memory and persisted state
    }),
    {
      name: 'ocean-auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist the `userId` & `deviceId`. The `token` will be reset to its initial value (`null`) on rehydration.
      partialize: (state) => ({
        userId: state.userId,
        deviceId: state.deviceId,
      }),
    },
  ),
);
