'use client';

import { useEffect } from 'react';

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

  // Attempt silent refresh on boot if token is missing
  useEffect(() => {
    if (!useAuthStore.getState().accessToken) {
      httpClient.post(API_ROUTES.AUTH.REFRESH).catch(() => {
        console.log(t('silentRefreshFailed'));
      });
    }
  }, []);

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
    const unsubscribeLogout = appEventBus.on('auth:logout', () => {
      console.log(t('handlingAuthLogout'));
      // Perform UI side-effects: clear local storage/zustand states if applicable
      // then redirect to login page if not already on an auth route
      const isAuthRoute = AUTH_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`),
      );

      if (!isAuthRoute) {
        router.push('/login');
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

  return (
    <>
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
