'use client';

import React from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface RoomListItemProps {
  roomId: string;
  name: string;
  lastMessage: string;
  avatarUrl: string;
  lastSeen: string; // Kept for potential use
  isActive: boolean;
}
const RoomListItemComponent: React.FC<RoomListItemProps> = ({
  roomId,
  name,
  lastMessage,
  isActive,
}: RoomListItemProps) => {
  return (
    <Link href={`/chat/${roomId}`} className={cn('flex items-center p-3 ')}>
      <div className="flex-1 min-w-0">
        {' '}
        {/* 确保文本溢出时正确显示省略号 */}
        <p
          className={cn(
            'font-medium text-sm text-gray-800 truncate',
            isActive && 'font-semibold',
          )}
        >
          {name}
        </p>
        <p className="text-xs text-gray-500 truncate group-hover:text-gray-600">
          {lastMessage}
        </p>
      </div>
    </Link>
  );
};

export const RoomListItem = React.memo(RoomListItemComponent);
