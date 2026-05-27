'use client';

import React, { use } from 'react';

import { useTranslations } from 'next-intl';

import ChatHeader from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { Separator } from '@/components/ui/separator';
import { getMockMessages } from '@/lib/mock-data';
import { useRoomStore } from '@/store/useRoomStore';

interface ChatRoomProps {
  params: Promise<{ roomId: string }>;
}

export default function ChatRoom({ params }: ChatRoomProps) {
  const { roomId } = use(params);
  const t = useTranslations('ChatRoom');

  // TODO: Use Redis store recent messages.
  // Simulate server-side fetch
  const messages = getMockMessages(roomId);
  
  const rooms = useRoomStore((state) => state.rooms);
  const room = rooms.find((r) => r.id === roomId);

  if (!room) {
    return (
      <div className="flex-1 flex items-center justify-center">
        {t('roomNotFound')}
      </div>
    );
  }

  const currentChatUser = {
    name: room.name,
    status: room.online ? t('online') : room.lastSeen,
    avatarUrl: room.avatarUrl,
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      <ChatHeader
        userName={currentChatUser.name}
        userStatus={currentChatUser.status}
        avatarUrl={currentChatUser.avatarUrl}
      />
      <Separator className="bg-black/5 dark:bg-white/10" />

      <ChatMessages roomId={roomId} messages={messages} />

      <ChatInput roomId={roomId} />
    </div>
  );
}
