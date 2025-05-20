'use client';

import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';

import { RoomListItem } from './room-list-item';

interface Room {
  id: string;
  name: string;
  lastMessage: string;
  avatarUrl: string;
  lastSeen: string;
  active?: boolean; // currently selected room
}

export function RoomList({ rooms }: { rooms: Room[] }) {
  return (
    <ScrollArea className="flex-1 p-2">
      <div className="space-y-1">
        {rooms.map((room) => (
          <RoomListItem
            key={room.id}
            roomId={room.id}
            name={room.name}
            lastMessage={room.lastMessage}
            avatarUrl={room.avatarUrl}
            lastSeen={room.lastSeen}
            isActive={room.active || false}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
