'use client';

import React, { use, useEffect } from 'react';

import { useTranslations } from 'next-intl';

import ChatHeader from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { Separator } from '@/components/ui/separator';
import { getSocketManager, Cmd, pb } from '@/lib/monkey-protocol';
import { useRoomStore } from '@/store/useRoomStore';

interface ChatRoomProps {
  params: Promise<{ roomId: string }>;
}

export default function ChatRoom({ params }: ChatRoomProps) {
  const { roomId } = use(params);
  const t = useTranslations('ChatRoom');

  const rooms = useRoomStore((state) => state.rooms);
  const resetUnreadCount = useRoomStore((state) => state.resetUnreadCount);
  const setActiveRoomId = useRoomStore((state) => state.setActiveRoomId);
  const room = rooms.find((r) => r.id === roomId);

  useEffect(() => {
    setActiveRoomId(roomId);
    return () => setActiveRoomId(null);
  }, [roomId, setActiveRoomId]);

  useEffect(() => {
    if (room && room.unreadCount && room.unreadCount > 0) {
      // 1. Clear local unread state
      resetUnreadCount(roomId);

      // 2. Send READ_RECEIPT frame via SocketManager
      const manager = getSocketManager();
      if (manager) {
        // According to protocol, READ_RECEIPT should contain the groupId
        // and theoretically the MaxLocalSyncSeqId to tell the server what we have read up to.
        // Assuming READ_RECEIPT payload requires `groupId` based on standard IM practices.
        const payload = pb.oceanchat.monkey.ReadReceipt.encode({
          groupId: roomId,
          // Normally we'd include syncSeqId here to mark the exact read position
        }).finish();

        manager.sendRequest({
          cmd: Cmd.READ_RECEIPT,
          flags: 0, // Fire-and-forget, usually doesn't require ACK
          length: payload.length,
          payload,
        }).catch(console.error);
      }
    }
  }, [roomId, room?.unreadCount, resetUnreadCount, room]);

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

      <ChatMessages roomId={roomId} />

      <ChatInput roomId={roomId} />
    </div>
  );
}
