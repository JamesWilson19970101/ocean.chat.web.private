import { v7 as uuidv7 } from 'uuid';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { UserProfile } from '@/types/auth';

interface AuthStore {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: UserProfile | null;
  deviceId: string;
  deviceType: 'Web';
  setAuth: (accessToken: string, user: UserProfile) => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
}

/**
 * Manages authentication state.
 *
 * IMPORTANT: This store strictly follows the security guidelines:
 * It persists ONLY the `deviceId` to localStorage.
 * `accessToken` and `user` data are held in-memory only to mitigate XSS risks.
 * The application relies on HttpOnly cookies and the /auth/refresh endpoint
 * to re-acquire the accessToken on startup or when it expires.
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      user: null,
      deviceId: `web-${uuidv7()}`,
      deviceType: 'Web',

      setAuth: (accessToken, user) =>
        set({ isAuthenticated: true, accessToken, user }),

      setAccessToken: (accessToken) =>
        set({ accessToken, isAuthenticated: true }),

      clearAuth: () =>
        set({ isAuthenticated: false, accessToken: null, user: null }),
    }),
    {
      name: 'ocean-auth-storage',
      storage: createJSONStorage(() => localStorage),
      // ONLY persist deviceId. Everything else is cleared on page reload
      // to ensure maximum token security.
      partialize: (state) => ({
        deviceId: state.deviceId,
      }),
    },
  ),
);
