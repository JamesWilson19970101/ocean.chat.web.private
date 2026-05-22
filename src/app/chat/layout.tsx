'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { AppLogo } from '@/components/chat/app-logo';
import { RoomList } from '@/components/chat/room-list';
import { SidebarHeader } from '@/components/chat/sidebar-header';
import { Separator } from '@/components/ui/separator';
import { mockRooms } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const isChatOpen = !!params?.roomId;

  // Simulate server-side fetch if needed
  const rooms = mockRooms;

  return (
    <div className="h-screen flex flex-col bg-[#F3F3F3] dark:bg-gray-950 font-sans">
      {/* main content */}
      <div className="flex-grow flex overflow-hidden relative">
        {/* left sidebar - room list */}
        <aside
          className={cn(
            'bg-[#F3F3F3]/80 backdrop-blur-3xl dark:bg-gray-900/80 border-r border-black/5 dark:border-white/10 flex flex-col transition-transform duration-300 ease-in-out absolute inset-y-0 left-0 w-full z-20 transform',
            'md:relative md:w-80 md:inset-auto md:translate-x-0',
            isChatOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0',
          )}
        >
          <SidebarHeader />
          <Separator className="bg-black/5 dark:bg-white/10" />
          <RoomList rooms={rooms} />

          {/* app logo at bottom */}
          <div className="mt-auto shrink-0">
            <AppLogo />
          </div>
        </aside>

        {/* right - chat content */}
        <main
          className={cn(
            'flex-1 flex flex-col transition-transform transform duration-300 ease-in-out bg-white/60 dark:bg-gray-950/60 backdrop-blur-[240px] shadow-[-32px_0_64px_rgba(0,0,0,0.05)] rounded-tl-[7px]',
            'absolute inset-y-0 left-0 w-full z-30 md:relative md:w-auto md:inset-auto md:z-10',
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
