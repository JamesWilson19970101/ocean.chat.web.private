'use client';

import React from 'react';

export default function DefaultChatPage() {
  // welciome page for the chat app
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full dark:bg-gray-850 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Welcome to Ocean Chat!
        </h2>
      </div>
    </div>
  );
}
