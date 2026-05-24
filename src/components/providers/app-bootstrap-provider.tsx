'use client';

import { useEffect, useState, useRef } from 'react';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Toaster, toast } from 'react-hot-toast';

import { API_ROUTES } from '@/constants/api-routes';
import { AUTH_ROUTES } from '@/constants/routes';
import { globalErrorDispatcher } from '@/lib/errors/error-dispatcher';
import { appEventBus } from '@/lib/event-bus';
import { initSocketManager, getSocketManager } from '@/lib/monkey-protocol';
import { httpClient } from '@/services/http/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';

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
    const isAuthRoute = AUTH_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

    // Scenario: No token is in memory, but the user attempts to access a protected page, and this occurs immediately after the application starts/refreshes.
    if (!token && !isAuthRoute && !hasBootstrapped.current) {
      setIsRestoring(true); // Blocking page rendering

      httpClient
        .post(API_ROUTES.AUTH.REFRESH, {}, { skipGlobalErrorHandler: true })
        .then((res) => {
          // Successfully retrieved the access token and stored it in memory.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newAccessToken = (res.data as any).accessToken;
          useAuthStore.getState().setAccessToken(newAccessToken);
        })
        .catch((err) => {
          console.error('Boot restore failed', err);
          // If refresh also fails, clear the page and redirect back to the login page.
          useAuthStore.getState().clearAuth();
          router.push('/login');
        })
        .finally(() => {
          hasBootstrapped.current = true;
          setIsRestoring(false); // Allow page rendering
        });
    } else {
      hasBootstrapped.current = true;
    }
  }, [pathname, token, router]);

  useEffect(() => {
    // Only connect if we have a token
    if (!token) return;

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
  }, [t, token]);

  useEffect(() => {
    // Listen to global events
    const unsubscribeLogout = appEventBus.on('auth:logout', async (payload) => {
      console.log(t('handlingAuthLogout'));

      try {
        if (!payload?.force) {
          // Send a cancellation request to the server. The server can clear the refresh_token of HttpOnly via Set-Cookie.
          // Passing `skipGlobalErrorHandler: true` prevents an infinite loop if the token has expired.
          await httpClient.post(
            API_ROUTES.AUTH.LOGOUT,
            {},
            { skipGlobalErrorHandler: true },
          );
        }
      } catch (err) {
        toast.error('Logout API failed or session already invalid', {
          duration: 5000,
        });
        // TODO: consider err stack printing
        console.error('Logout API failed or session already invalid', err);
      } finally {
        // Force clean up and redirect regardless of API success or failure
        getSocketManager()?.disconnect();
        useAuthStore.getState().clearAuth();

        const isAuthRoute = AUTH_ROUTES.some(
          (route) => pathname === route || pathname.startsWith(`${route}/`),
        );
        if (!isAuthRoute) {
          router.push('/login');
        }
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
  }, [router, pathname, t]);

  // TODO: Optimize loading UI
  // During token recovery, no child components are rendered, thus completely preventing forced entry into the interface without a token.
  if (isRestoring) {
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
