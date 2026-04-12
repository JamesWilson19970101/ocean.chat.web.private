'use client';

import React from 'react';

import Link from 'next/link';

import { UserAvatar } from '@/components/chat/user-avatar';
import { cn } from '@/lib/utils';

interface RoomListItemProps {
  roomId: string;
  name: string;
  lastMessage: string;
  avatarUrl: string;
  lastSeen: string;
  isActive: boolean;
  unreadCount?: number;
  online?: boolean;
}

const RoomListItemComponent: React.FC<RoomListItemProps> = ({
  roomId,
  name,
  lastMessage,
  avatarUrl,
  lastSeen,
  isActive,
  unreadCount,
  online,
}: RoomListItemProps) => {
  return (
    <Link
      href={`/chat/${roomId}`}
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg transition-colors group',
        isActive
          ? 'bg-white dark:bg-gray-800 shadow-sm'
          : 'hover:bg-gray-200 dark:hover:bg-gray-800',
      )}
    >
      <div className="relative flex-shrink-0">
        <UserAvatar src={avatarUrl} alt={name} className="h-10 w-10" />
        {online && (
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-[#F3F3F3] dark:border-gray-900" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <p
            className={cn(
              'font-semibold text-sm text-gray-900 dark:text-gray-100 truncate',
              isActive ? 'text-blue-600 dark:text-blue-400' : '',
            )}
          >
            {name}
          </p>
          <span className="text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
            {lastSeen}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate pr-2">
            {lastMessage}
          </p>
          {unreadCount ? (
            <span className="flex-shrink-0 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-blue-500 text-white text-[10px] font-bold">
              {unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export const RoomListItem = React.memo(RoomListItemComponent);
