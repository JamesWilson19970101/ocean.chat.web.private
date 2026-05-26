'use client';

import React from 'react';

import {
  Play,
  FileText,
  Download,
  Volume2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';

import { UserAvatar } from './user-avatar';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const isSender = message.isOwn;

  return (
    <div
      className={cn(
        'flex items-end gap-3 group',
        isSender ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      {!isSender && (
        <UserAvatar
          src={message.avatarUrl}
          alt={message.sender}
          className="h-8 w-8 flex-shrink-0 mb-6"
        />
      )}

      <div
        className={cn(
          'flex flex-col gap-1.5 max-w-[85%] sm:max-w-[75%] md:max-w-[65%]',
          isSender ? 'items-end' : 'items-start',
        )}
      >
        {!isSender && (
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 ml-2">
            {message.sender}
          </span>
        )}

        <div className="flex items-center gap-2 max-w-full">
          {/* Status Indicator for Sender */}
          {isSender && message.sendStatus === 'SENDING' && (
            <Clock className="w-3 h-3 text-gray-400 animate-spin shrink-0" />
          )}
          {isSender && message.sendStatus === 'FAILED' && (
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          )}

          <div
            className={cn(
              'relative p-[14px] text-[15px] transition-all border-0 shadow-[0_1px_2px_rgba(0,0,0,0.08)] min-w-0 break-words',
              isSender
                ? 'rounded-[20px] rounded-br-[4px] bg-[#007AFF] text-white dark:bg-[#0A84FF]'
                : 'rounded-[20px] rounded-bl-[4px] bg-[#F4F4F5] text-gray-900 dark:bg-gray-800 dark:text-gray-100',
            )}
          >
            {message.type === 'audio' ? (
              <div className="flex items-center gap-3 min-w-[200px] sm:min-w-[280px] max-w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-8 w-8 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30',
                    isSender
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300',
                  )}
                >
                  <Play className="h-4 w-4" fill="currentColor" />
                </Button>

                <div className="flex-1 flex items-center h-8 relative group cursor-pointer">
                  <div
                    className={cn(
                      'absolute w-full h-[4px] rounded-full overflow-hidden',
                      isSender ? 'bg-white/30' : 'bg-gray-300 dark:bg-gray-600',
                    )}
                  >
                    <div
                      className={cn(
                        'h-full w-1/3',
                        isSender
                          ? 'bg-white'
                          : 'bg-[#007AFF] dark:bg-[#0A84FF]',
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      'absolute left-1/3 w-3 h-3 border-2 rounded-full -ml-1.5 shadow-sm',
                      isSender
                        ? 'bg-white border-[#007AFF]'
                        : 'bg-[#007AFF] border-white',
                    )}
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-8 w-8 rounded-full hover:bg-white/20 dark:hover:bg-black/20',
                    isSender ? 'text-white' : 'text-gray-500',
                  )}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            ) : message.type === 'file' ? (
              <div className="flex items-center gap-3 max-w-full">
                <div
                  className={cn(
                    'p-2 rounded-lg shrink-0',
                    isSender
                      ? 'bg-white/20'
                      : 'bg-gray-200/50 dark:bg-gray-700',
                  )}
                >
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-medium truncate underline cursor-pointer">
                    {message.fileName || 'document.pdf'}
                  </span>
                  <span className="text-[11px] opacity-70">
                    {message.fileSize || '1.2 MB'}
                  </span>
                </div>
                <Download className="h-4 w-4 opacity-70 cursor-pointer hover:opacity-100 shrink-0" />
              </div>
            ) : message.isLink ? (
              <Link
                href={message.text || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'underline break-all font-medium inline-block max-w-full',
                  isSender
                    ? 'text-white hover:opacity-80'
                    : 'text-gray-900 dark:text-gray-100 hover:opacity-80',
                )}
              >
                {message.text}
              </Link>
            ) : (
              <p className="leading-relaxed whitespace-pre-wrap break-words font-medium text-[15px] max-w-full">
                {message.text}
              </p>
            )}
          </div>
        </div>

        <span
          className={cn(
            'text-[11px] text-gray-400 dark:text-gray-500 px-2 mt-0.5',
            isSender ? 'text-right' : 'text-left',
          )}
        >
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}
