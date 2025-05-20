'use client';

import React from 'react';

import { Phone, Video, Info, Paperclip } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { UserAvatar } from './user-avatar';

interface ChatHeaderProps {
  userName: string;
  userStatus: string;
  avatarUrl?: string;
}

export default function ChatHeader({
  userName,
  //   userStatus,
  avatarUrl,
}: ChatHeaderProps) {
  return (
    <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-3">
        <UserAvatar src={avatarUrl} alt={userName} />
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-white">
            {userName}
          </h2>
          {/* <p className="text-xs text-gray-500 dark:text-gray-400">{userStatus}</p> */}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <Paperclip className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Attach</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <Video className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
