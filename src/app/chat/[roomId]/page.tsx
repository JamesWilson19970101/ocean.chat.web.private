'use client';

import React from 'react';

import ChatHeader from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { Separator } from '@/components/ui/separator';

const mockMessages = [
  {
    id: 'm1',
    sender: 'John Doe',
    text: 'I can pass you the Figma link if you want',
    timestamp: '10:00 AM',
    isOwn: false,
    avatarUrl: '/avatars/john.png',
  },
  {
    id: 'm2',
    sender: 'You',
    text: 'Pass me the link so I can take a look',
    timestamp: '10:01 AM',
    isOwn: true,
  },
  {
    id: 'm3',
    sender: 'John Doe',
    text: '[https://www.figma.com/file/oVUfBeeZdhdXmqQtLaKSZu/J.tree-Design?node-id=155%3A2858](https://www.figma.com/file/oVUfBeeZdhdXmqQtLaKSZu/J.tree-Design?node-id=155%3A2858)',
    timestamp: '10:02 AM',
    isOwn: false,
    isLink: true,
    avatarUrl: '/avatars/john.png',
  },
];

const currentChatUser = {
  name: 'John Doe',
  status: 'Last seen 2 hours ago',
  avatarUrl: '/avatars/john.png',
};

export default function ChatRoom() {
  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        userName={currentChatUser.name}
        userStatus={currentChatUser.status}
        avatarUrl={currentChatUser.avatarUrl}
      />
      <Separator />

      <ChatMessages messages={mockMessages} />

      <ChatInput />
    </div>
  );
}
