'use client';

import React from 'react';

import { Search, House, Frame, Clock3, Plus } from 'lucide-react';

import { Header } from '@/components/chat/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      {/* header */}
      <Header />
      {/* main content */}
      <div className="flex-grow flex bg-white dark:bg-gray-900 overflow-x-hidden relative">
        {/* left sidebar - room list */}
        <aside
          className={cn(
            'bg-[#F3F3F3] border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out absolute inset-y-0 left-0 w-full transform',
            'md:relative md:w-80 md:inset-auto',
          )}
        >
          <div className="p-2 flex space-x-3 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 active:bg-transparent active:text-gray-300 w-4 h-4 ml-3"
              onClick={() => console.log('House icon clicked')}
            >
              <House />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 active:bg-transparent active:text-gray-300 w-4 h-4"
              onClick={() => console.log('Frame icon clicked')}
            >
              <Frame />
            </Button>
          </div>
          <div className="p-2">
            <div className="relative flex items-center">
              <div className="flex items-center w-2/3 h-8 bg-gray-50 border border-gray-200 rounded-md">
                <Input
                  placeholder="Search Room"
                  className="flex-grow h-full bg-transparent border-none shadow-none rounded-none focus:ring-0 focus-visible:ring-0 focus:outline-none pl-3 pr-1 text-sm text-gray-900 placeholder-gray-500"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 active:text-gray-300 h-full flex items-center justify-center px-2 focus:ring-0 focus:outline-none rounded-none hover:bg-transparent"
                  onClick={() => console.log('Search icon clicked')}
                >
                  <Search />
                </Button>
              </div>
              <div className="flex items-center ml-auto space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 active:bg-transparent active:text-gray-300 w-4 h-4"
                  onClick={() => console.log('Clock3 icon clicked')}
                >
                  <Clock3 />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 active:bg-transparent active:text-gray-300 w-4 h-4"
                  onClick={() => console.log('Plus icon clicked')}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        </aside>
        {/* right - chat content */}
        <main
          className={cn(
            'flex-1 transition-transform transform duration-300 ease-in-out translate-x-full bg-white md:translate-x-0',
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
