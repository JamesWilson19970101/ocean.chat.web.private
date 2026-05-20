'use client';

import React, { useEffect, useRef, useMemo } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/store/useChatStore';
import { Message } from '@/types/chat';

import { MessageItem } from './message-item';

interface ChatMessagesProps {
  roomId: string;
  messages: Message[];
}

export function ChatMessages({ roomId, messages: initialMessages }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const storeMessages = useChatStore((state) => state.messages);
  const currentUserId = useChatStore((state) => state.currentUserId);

  useEffect(() => {
    // Load local db messages on mount
    useChatStore.getState().loadMessagesFromDB(roomId);
  }, [roomId]);

  // Combine and map storeMessages to UI format
  const mappedStoreMessages: Message[] = useMemo(() => {
    return storeMessages.map(m => ({
      id: m.client_msg_id,
      sender: m.sender_id === currentUserId ? 'Me' : (m.sender_id || 'Other'),
      text: m.content,
      timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: m.sender_id === currentUserId,
      type: 'text',
      sendStatus: m.send_status
    }));
  }, [storeMessages, currentUserId]);
  // In a real application, you'd properly merge initialMessages from Server with Local DB messages.
  // For the sake of the Monkey Protocol demonstration, we append the mapped store messages to the mock initial messages.
  const displayMessages = useMemo(() => {
    return [...initialMessages, ...mappedStoreMessages];
  }, [initialMessages, mappedStoreMessages]);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [displayMessages]);

  return (
    <ScrollArea
      className="flex-1 px-[20px] py-[30px] bg-transparent overflow-y-auto"
      ref={scrollAreaRef}
    >
      <div ref={viewportRef} className="h-full">
        <div className="space-y-[15px]">
          {displayMessages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
