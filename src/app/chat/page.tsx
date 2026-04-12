'use client';

import React from 'react';

import { MessageSquare } from 'lucide-react';

export default function DefaultChatPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="flex flex-col items-center text-center max-w-sm">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
          Welcome to Ocean Chat
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Select a conversation from the sidebar to start messaging. Or create a
          new room to connect with others.
        </p>
      </div>
    </div>
  );
}
