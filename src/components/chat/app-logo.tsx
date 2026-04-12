'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import ocean_chat from '../../../public/ocean_chat750x750.webp';

export function AppLogo() {
  return (
    <header className="px-4 py-4 flex items-center justify-center bg-transparent z-30 shrink-0">
      <Link
        href="https://jameswilson19970101.github.io/ocean.chat.docs/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="relative h-8 w-8 rounded-lg overflow-hidden ring-2 ring-blue-500/20 shadow-lg">
          <Image
            src={ocean_chat}
            alt="Ocean Chat Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
          Ocean Chat
        </h1>
      </Link>
    </header>
  );
}
