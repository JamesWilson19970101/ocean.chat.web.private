import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';

import ocean_chat from '../../../public/ocean_chat750x750.webp'; // Adjusted path relative to /app/chat/layout.tsx

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="p-4 flex items-center bg-gray-100">
        <Image
          src={ocean_chat}
          alt="ocean chat"
          width={50}
          height={50}
          className="rounded-full mr-3 object-cover"
        />
        <h1 className="text-xl font-semibold text-gray-800">Ocean Chat</h1>
      </div>
      <div className="flex h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
        {/* left sidebar - room list */}
        <aside
          className={cn(
            'bg-[#F3F3F3] border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out absolute inset-y-0 left-0 w-full transform',
            'md:relative md:w-80 md:inset-auto',
          )}
        ></aside>
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
