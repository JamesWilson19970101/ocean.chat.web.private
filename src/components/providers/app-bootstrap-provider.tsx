'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { globalErrorDispatcher } from '@/lib/errors/error-dispatcher';
import { appEventBus } from '@/lib/event-bus';
import { initSocketManager, getSocketManager } from '@/lib/monkey-protocol';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';

export function AppBootstrapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const t = useTranslations('Errors');
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);

  // Sync userId to ChatStore for dynamic UI logic
  useEffect(() => {
    useChatStore.getState().setCurrentUserId(userId);
  }, [userId]);

  // Inject translator into the singleton dispatcher
  useEffect(() => {
    globalErrorDispatcher.setTranslator((key: string) => t(key));
  }, [t]);

  useEffect(() => {
    // Only connect if we have a token
    // TODO: Sliently refresh token
    if (!token) return;

    // Initialize Monkey Protocol Socket Manager
    const socketManager = initSocketManager({
      url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:1996/monkey',
      jwt: async () => useAuthStore.getState().token,
      deviceId: useAuthStore.getState().deviceId,
      deviceType: 'web',
    });

    socketManager?.connect();

    return () => {
      // Prevent connection leaks during HMR or navigation
      console.log('AppBootstrapProvider: Cleaning up WebSocket connection');
      getSocketManager()?.disconnect();
    };
  }, [token]);

  useEffect(() => {
    // Listen to global events
    const unsubscribeLogout = appEventBus.on('auth:logout', () => {
      console.log('AppBootstrapProvider: Handling auth:logout event');
      // Perform UI side-effects: clear local storage/zustand states if applicable
      // then redirect to login page
      router.push('/login');
    });

    const unsubscribeForceUpdate = appEventBus.on(
      'protocol:force-update',
      () => {
        console.error(
          'AppBootstrapProvider: Handling protocol:force-update event (Protocol Mismatch)',
        );
        alert('Protocol version mismatch. Please update your client.'); // Use components instead of alert.
      },
    );

    // Cleanup listeners on unmount
    return () => {
      unsubscribeLogout();
      unsubscribeForceUpdate();
    };
  }, [router]);

  return <>{children}</>;
}
