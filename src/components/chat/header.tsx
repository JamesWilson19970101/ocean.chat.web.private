'use client';

import React from 'react';

import Image from 'next/image';

import ocean_chat from '../../../public/ocean_chat750x750.webp';

export function Header() {
  return (
    <div className="p-3 flex items-center bg-gray-100 overflow-x-hidden">
      <Image
        src={ocean_chat}
        alt="ocean chat"
        width={30}
        height={30}
        className="rounded-full mr-3 object-cover shrink-0"
      />
      <h1 className="text-xl font-semibold text-gray-800">Ocean Chat</h1>
    </div>
  );
}
