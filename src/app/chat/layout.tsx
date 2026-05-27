'use client';

import React, { useState, useRef, useEffect } from 'react';

import { useParams } from 'next/navigation';

import { AppLogo } from '@/components/chat/app-logo';
import { RoomList } from '@/components/chat/room-list';
import { SidebarHeader } from '@/components/chat/sidebar-header';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useRoomStore } from '@/store/useRoomStore';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const isChatOpen = !!params?.roomId;

  const rooms = useRoomStore((state) => state.rooms);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isOverlapping, setIsOverlapping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevChatOpen = useRef(isChatOpen);

  useEffect(() => {
    if (prevChatOpen.current !== isChatOpen) {
      const frameId = requestAnimationFrame(() => {
        setIsAnimating(true);
      });
      const timer = setTimeout(() => setIsAnimating(false), 300);
      prevChatOpen.current = isChatOpen;
      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(timer);
      };
    }
  }, [isChatOpen]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const bottomSentinel = bottomRef.current;
    const logoContainer = logoRef.current;

    if (!container || !bottomSentinel || !logoContainer) return;

    // Dynamically obtain the actual pixel height of the AppLogo container on the current device.
    const logoHeight = logoContainer.offsetHeight;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the probe element at the bottom is not visible, it means you haven't slid to the bottom yet (it's in an overlapping occlusion state).
        setIsOverlapping(!entry.isIntersecting);
      },
      {
        root: container,
        rootMargin: `0px 0px -${logoHeight + 10}px 0px`,
        threshold: 0,
      },
    );

    observer.observe(bottomSentinel);

    return () => {
      observer.disconnect(); // clear observer
    };
  }, [rooms]);

  return (
    <div className="h-screen flex flex-col bg-[#F3F3F3] dark:bg-gray-950 font-sans">
      {/* main content */}
      <div className="flex-grow flex overflow-hidden relative">
        {/* left sidebar - room list */}
        <aside
          className={cn(
            'border-r border-black/5 dark:border-white/10 flex flex-col transition-all duration-300 ease-in-out absolute inset-y-0 left-0 w-full z-20 transform-gpu will-change-transform',
            'md:relative md:w-80 md:inset-auto md:translate-x-0',
            isAnimating
              ? 'bg-[#F3F3F3] dark:bg-gray-900'
              : 'bg-[#F3F3F3]/80 dark:bg-gray-900/80 backdrop-blur-xl md:backdrop-blur-3xl',
            isChatOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0',
          )}
        >
          <SidebarHeader />
          <Separator className="bg-black/5 dark:bg-white/10" />

          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto pb-32"
          >
            <RoomList rooms={rooms} />
            {/* Bottom virtual probe element */}
            <div ref={bottomRef} className="h-px w-full shrink-0" />
          </div>

          {/* app logo at bottom */}
          <div
            ref={logoRef}
            className={cn(
              'absolute bottom-0 left-0 w-full shrink-0 transition-opacity duration-300',
              isOverlapping ? 'opacity-30 pointer-events-none' : 'opacity-100',
            )}
          >
            <AppLogo />
          </div>
        </aside>

        {/* right - chat content */}
        <main
          className={cn(
            'flex-1 flex flex-col transition-all duration-300 ease-in-out shadow-[-32px_0_64px_rgba(0,0,0,0.05)] rounded-tl-[7px] transform-gpu will-change-transform',
            'absolute inset-y-0 left-0 w-full z-30 md:relative md:w-auto md:inset-auto md:z-10',
            isAnimating
              ? 'bg-white dark:bg-gray-950'
              : 'bg-white/60 dark:bg-gray-950/60 backdrop-blur-2xl md:backdrop-blur-[240px]',
            isChatOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0',
          )}
        >
          {/* Subtle gradient overlay at the top (Mica effect matching) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F9F9F9] to-transparent pointer-events-none opacity-50 rounded-tl-[7px]" />

          <div className="relative flex flex-col h-full z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
