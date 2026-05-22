import React from 'react';

import { getTranslations } from 'next-intl/server';

import ChatHeader from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { Separator } from '@/components/ui/separator';
import { getMockMessages, mockRooms } from '@/lib/mock-data';

interface ChatRoomProps {
  params: Promise<{ roomId: string }>;
}

export default async function ChatRoom({ params }: ChatRoomProps) {
  const { roomId } = await params;
  const t = await getTranslations('ChatRoom');

  // TODO: Use Redis store recent messages.
  // Simulate server-side fetch
  const messages = getMockMessages(roomId);
  const room = mockRooms.find((r) => r.id === roomId);

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
