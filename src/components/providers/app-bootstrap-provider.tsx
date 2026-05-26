'use client';

import { useEffect, useState, useRef } from 'react';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Toaster, toast } from 'react-hot-toast';

import { AUTH_ROUTES } from '@/constants/routes';
import { globalErrorDispatcher } from '@/lib/errors/error-dispatcher';
import { appEventBus } from '@/lib/event-bus';
import { initSocketManager, getSocketManager } from '@/lib/monkey-protocol';
import { authService } from '@/services/http/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import { useConnectionStore } from '@/store/useConnectionStore';

export function AppBootstrapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Errors');
  const token = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.user?._id);

  const [isRestoring, setIsRestoring] = useState(false);
  const hasBootstrapped = useRef(false);
  const isAuthenticated = !!token;
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // Sync userId to ChatStore for dynamic UI logic
  useEffect(() => {
    useChatStore.getState().setCurrentUserId(userId ?? null);
  }, [userId]);

  // Inject translator into the singleton dispatcher and event bus
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const translator = (key: string, values?: Record<string, any>) =>
      t(key, values);
    globalErrorDispatcher.setTranslator(translator);
    appEventBus.setTranslator(translator);
  }, [t]);

  useEffect(() => {
    // Scenario: No token is in memory, but the user attempts to access a protected page, and this occurs immediately after the application starts/refreshes.
    if (!token && !isAuthRoute && !hasBootstrapped.current) {
      setIsRestoring(true); // Blocking page rendering

      authService
        .refresh({ skipGlobalErrorHandler: true })
        .then((res) => {
          // Successfully retrieved the access token and stored it in memory.
          const newAccessToken = res.accessToken;
          useAuthStore.getState().setAccessToken(newAccessToken);
        })
        .catch((err) => {
          console.error('Boot restore failed', err);
          // If boot refresh fails, the user has no token in memory and cannot proceed.
          useAuthStore.getState().clearAuth();
          router.push('/login?clear_session=1');
        })
        .finally(() => {
          hasBootstrapped.current = true;
          setIsRestoring(false); // Allow page rendering
        });
    } else {
      hasBootstrapped.current = true;
    }
  }, [pathname, token, router, isAuthRoute]);

  // Mechanism for silently refreshing the token ahead of time
  useEffect(() => {
    // If there is no token (not logged in), do not start the timer
    if (!token) return;

    // TODO: The access token expiration time needs to be dynamically viewed through the settings interface.
    // Assuming 15 mins (900s) expiration, refresh 3 mins (180s) ahead of time, i.e., trigger every 720 seconds (12 mins)
    const REFRESH_INTERVAL = 720 * 1000;

    const timer = setInterval(() => {
      // Check if the long connection is in a normal state before refreshing.
      // We skip the refresh if the connection has permanently 'failed' or is 'offline'.
      // (We still refresh if it's 'waiting' or 'connecting' to prevent token expiration during retries).
      const connStatus = useConnectionStore.getState().status;
      if (connStatus === 'failed' || connStatus === 'offline') {
        console.log(
          `[Token Refresh] Skipped silent refresh because WS status is '${connStatus}'`,
        );
        return;
      }

      authService
        .refresh({ skipGlobalErrorHandler: true })
        .then((res) => {
          const newAccessToken = res.accessToken;
          if (newAccessToken) {
            useAuthStore.getState().setAccessToken(newAccessToken);
            // Immediately re-authenticate the active WebSocket connection with the new token
            getSocketManager()?.reauthenticate();
          }
        })
        .catch((err) =>
          console.error('Scheduled silent token refresh failed:', err),
        );
    }, REFRESH_INTERVAL);

    return () => clearInterval(timer);
  }, [token]);

  useEffect(() => {
    // Only connect if the user is authenticated
    if (!isAuthenticated) return;

    // Initialize Monkey Protocol Socket Manager
    const socketManager = initSocketManager({
      url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:1996/monkey',
      jwt: async () => useAuthStore.getState().accessToken,
      deviceId: useAuthStore.getState().deviceId,
      deviceType: 'web',
    });

    socketManager?.connect();

    return () => {
      // Prevent connection leaks during HMR or navigation
      console.log(t('cleaningUpWebSocket'));
      getSocketManager()?.disconnect();
    };
  }, [t, isAuthenticated]);

  useEffect(() => {
    // Listen to global events
    const unsubscribeLogout = appEventBus.on('auth:logout', async (payload) => {
      try {
        if (!payload?.force) {
          // Send a cancellation request to the server. The server can clear the refresh_token of HttpOnly via Set-Cookie.
          // Passing `skipGlobalErrorHandler: true` prevents an infinite loop if the token has expired.
          await authService.logout({ skipGlobalErrorHandler: true });
        }
      } catch (err) {
        const errorMsg =
          t('logoutFailed') || 'Logout API failed or session already invalid';
        toast.error(errorMsg, {
          duration: 5000,
        });
        // TODO: consider err stack printing
        console.error(errorMsg, err);
      } finally {
        // Force clean up and redirect regardless of API success or failure
        getSocketManager()?.disconnect();
        useAuthStore.getState().clearAuth();

        // Always redirect to login with the clear_session flag to guarantee the HttpOnly cookie is removed by middleware
        router.push('/login?clear_session=1');
      }
    });

    const unsubscribeForceUpdate = appEventBus.on(
      'protocol:force-update',
      () => {
        console.error(t('handlingProtocolMismatch'));
        toast.error(t('protocolMismatch'), { duration: 5000 });
      },
    );

    // Cleanup listeners on unmount
    return () => {
      unsubscribeLogout();
      unsubscribeForceUpdate();
    };
  }, [router, t]);

  // TODO: Optimize loading UI
  // During token recovery, no child components are rendered, thus completely preventing forced entry into the interface without a token.
  if (isRestoring || (!token && !isAuthRoute)) {
    return (
      <>
        <div className="flex h-screen w-screen items-center justify-center bg-[#F9F9F9] dark:bg-gray-900 text-gray-400">
          Loading...
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </>
    );
  }

  return (
    <>
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
