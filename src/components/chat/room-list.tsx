'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Room } from '@/types/chat';

import { RoomListItem } from './room-list-item';

export function RoomList({ rooms }: { rooms: Room[] }) {
  const params = useParams();
  
  return (
    <ScrollArea className="flex-1 p-3">
      <div className="space-y-2">
        {rooms.map((room) => (
          <RoomListItem
            key={room.id}
            roomId={room.id}
            name={room.name}
            lastMessage={room.lastMessage}
            avatarUrl={room.avatarUrl}
            lastSeen={room.lastSeen}
            isActive={params.roomId === room.id || false}
            unreadCount={room.unreadCount}
            online={room.online}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
