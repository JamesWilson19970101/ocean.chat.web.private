'use client';

import React, { useEffect, useRef } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types/chat';

import { MessageItem } from './message-item';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea
      className="flex-1 px-[20px] py-[30px] bg-transparent overflow-y-auto"
      ref={scrollAreaRef}
    >
      <div ref={viewportRef} className="h-full">
        <div className="space-y-[15px]">
          {messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
