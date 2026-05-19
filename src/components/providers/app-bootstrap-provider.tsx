'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { globalErrorDispatcher } from '@/lib/errors/error-dispatcher';
import { appEventBus } from '@/lib/event-bus';

export function AppBootstrapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const t = useTranslations('Errors');

  // Inject translator into the singleton dispatcher
  useEffect(() => {
    globalErrorDispatcher.setTranslator((key: string) => t(key));
  }, [t]);

  useEffect(() => {
    // Listen to global events
    const unsubscribeLogout = appEventBus.on('auth:logout', () => {
      console.log('AppBootstrapProvider: Handling auth:logout event');
      // Perform UI side-effects: clear local storage/zustand states if applicable
      // then redirect to login page
      router.push('/login');
    });

    // Cleanup listeners on unmount
    return () => {
      unsubscribeLogout();
    };
  }, [router]);

  return <>{children}</>;
}
