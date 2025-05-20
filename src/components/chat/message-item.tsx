'use client';

import React from 'react';

import { Play } from 'lucide-react'; // For audio play button
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // 用于气泡样式
import { cn } from '@/lib/utils';

import { UserAvatar } from './user-avatar';

export interface Message {
  id: string;
  sender: string; // or userId
  text?: string;
  timestamp: string;
  isOwn: boolean;
  avatarUrl?: string; // Only needed for received messages if showing avatar per message
  isLink?: boolean;
  type?: string; // Extend as needed
  duration?: string; // For audio
}

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const isSender = message.isOwn;

  return (
    <div
      className={cn(
        'flex items-end space-x-2',
        isSender ? 'justify-end' : 'justify-start',
      )}
    >
      {!isSender && (
        <UserAvatar
          src={message.avatarUrl}
          alt={message.sender}
          className="h-8 w-8 self-start"
        />
      )}
      <Card
        className={cn(
          'max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-0 shadow-sm', // Adjusted padding here
          isSender
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-white dark:bg-gray-700 dark:text-gray-100 rounded-bl-none',
        )}
      >
        <CardContent className="p-2.5">
          {' '}
          {/* Added padding back here */}
          {!isSender && (
            <p className="text-xs font-medium mb-1 text-gray-600 dark:text-gray-300">
              {message.sender}
            </p>
          )}
          {message.type === 'audio' ? (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-8 w-8',
                  isSender
                    ? 'text-white hover:bg-blue-600'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600',
                )}
              >
                <Play className="h-5 w-5" />
              </Button>
              <div className="flex-1 h-2 bg-gray-300 dark:bg-gray-500 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 dark:bg-blue-400"
                  style={{ width: '40%' }}
                ></div>{' '}
                {/* Example progress */}
              </div>
              <span
                className={cn(
                  'text-xs',
                  isSender
                    ? 'text-blue-100'
                    : 'text-gray-500 dark:text-gray-400',
                )}
              >
                {message.duration}
              </span>
            </div>
          ) : message.isLink ? (
            <Link
              href={message.text || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline break-all"
            >
              {message.text}
            </Link>
          ) : (
            <p className="text-sm break-words whitespace-pre-wrap">
              {message.text}
            </p>
          )}
          {/* <p className={cn(
            "text-xs mt-1",
            isSender ? "text-blue-200 text-right" : "text-gray-400 dark:text-gray-500 text-left"
          )}>
            {message.timestamp}
          </p> */}
        </CardContent>
      </Card>
      {isSender &&
        message.text ===
          'Thanks 😄' /* Example of showing avatar for own message in specific cases */ && (
          <UserAvatar alt="You" className="h-8 w-8" fallbackText="😄" />
        )}
    </div>
  );
}
