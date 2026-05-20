'use client';

import React from 'react';

import { Play, FileText, Download, Volume2, Clock, AlertCircle } from 'lucide-react';
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
          className="h-8 w-8 flex-shrink-0 mb-1"
        />
      )}

      <div
        className={cn(
          'flex flex-col gap-1 max-w-[75%] md:max-w-[65%]',
          isSender ? 'items-end' : 'items-start',
        )}
      >
        {!isSender && (
          <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 ml-1">
            {message.sender}
          </span>
        )}

        <div className="flex items-center gap-2">
          {/* Status Indicator for Sender */}
          {isSender && message.sendStatus === 'SENDING' && (
            <Clock className="w-3 h-3 text-gray-400 animate-spin" />
          )}
          {isSender && message.sendStatus === 'FAILED' && (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}

          <div
            className={cn(
              'relative px-[15px] py-[13px] rounded-[3px] text-sm transition-all border shadow-sm',
              isSender
                ? 'bg-[#8CB9F4] border-black/5 dark:bg-blue-600/80 dark:border-white/10 text-gray-900 dark:text-gray-100'
                : 'bg-[#F3F3F3] border-black/5 dark:bg-gray-800 dark:border-white/10 text-gray-900 dark:text-gray-100',
            )}
          >
            {message.type === 'audio' ? (
              <div className="flex items-center gap-3 min-w-[280px] bg-white/50 dark:bg-black/20 p-2 rounded-[8px] border border-black/5 dark:border-white/10">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-8 w-8 rounded-[4px] border border-black/5 bg-transparent',
                    'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10',
                  )}
                >
                  <Play className="h-4 w-4" fill="currentColor" />
                </Button>
                
                <div className="flex-1 flex items-center h-8 relative group cursor-pointer">
                  {/* Custom Slider Track */}
                  <div className="absolute w-full h-[4px] bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-1/3" />
                  </div>
                  {/* Thumb */}
                  <div className="absolute left-1/3 w-3 h-3 bg-blue-600 border-2 border-white rounded-full -ml-1.5 shadow-sm" />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:bg-black/5 rounded-[4px]"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            ) : message.type === 'file' ? (
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'p-2 rounded-lg',
                    isSender ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700',
                  )}
                >
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-medium truncate underline cursor-pointer">
                    {message.fileName || 'document.pdf'}
                  </span>
                  <span className="text-[10px] opacity-70">
                    {message.fileSize || '1.2 MB'}
                  </span>
                </div>
                <Download className="h-4 w-4 opacity-70 cursor-pointer hover:opacity-100" />
              </div>
            ) : message.isLink ? (
              <Link
                href={message.text || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'underline break-all font-bold',
                  isSender
                    ? 'text-gray-900 dark:text-gray-100 hover:opacity-80'
                    : 'text-gray-900 dark:text-gray-100 hover:opacity-80',
                )}
              >
                {message.text}
              </Link>
            ) : (
              <p className="leading-relaxed whitespace-pre-wrap break-words font-semibold text-[14px]">
                {message.text}
              </p>
            )}
          </div>
        </div>

        <span
          className={cn(
            'text-[10px] text-gray-400 dark:text-gray-500 px-1',
            isSender ? 'text-right' : 'text-left',
          )}
        >
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}
