'use client';

import React from 'react';

import { Info, Paperclip, ChevronLeft, ChevronDown, Share } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useConnectionStore } from '@/store/useConnectionStore';

import { UserAvatar } from './user-avatar';

interface ChatHeaderProps {
  userName: string;
  userStatus: string;
  avatarUrl?: string;
}

export default function ChatHeader({
  userName,
  userStatus,
  avatarUrl,
}: ChatHeaderProps) {
  const router = useRouter();
  const t = useTranslations('Chat');
  const connStatus = useConnectionStore((state) => state.status);

  return (
    <div className="px-4 py-3 flex flex-col gap-2 bg-[#F9F9F9] dark:bg-gray-900 border-b border-black/5 dark:border-white/10 z-10 backdrop-blur-3xl bg-opacity-80 dark:bg-opacity-80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden -ml-2 h-8 w-8 text-gray-500"
            onClick={() => router.push('/chat')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <UserAvatar
            src={avatarUrl}
            alt={userName}
            className="h-10 w-10 hidden sm:flex"
          />

          <div className="flex flex-col min-w-0 py-1 px-2 rounded-[4px] bg-transparent">
            <h2 className="text-[25px] font-extrabold text-gray-900 dark:text-gray-100 leading-none">
              {userName}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              {userStatus && (
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {userStatus}
                </span>
              )}
              {connStatus === 'waiting' && (
                <span className="text-xs text-orange-500 font-bold bg-orange-100 dark:bg-orange-900/30 px-1.5 py-0.5 rounded-sm">
                  Connecting...
                </span>
              )}
              {connStatus === 'offline' && (
                <span className="text-xs text-red-500 font-bold bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded-sm">
                  Offline
                </span>
              )}
            </div>
          </div>
        </div>

        {/* This represents the Window Control Buttons shown in the design, though adapted for Web */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:bg-black/5"
          >
            <span className="text-lg">−</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:bg-black/5"
          >
            <span className="text-lg">□</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:bg-black/5"
          >
            <span className="text-lg">×</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <div className="flex bg-transparent rounded-[4px] border border-transparent hover:border-black/5 transition-colors">
            <Button
              variant="ghost"
              className="h-8 px-3 text-[12px] font-bold text-gray-900 dark:text-gray-100 hover:bg-black/5 rounded-r-none"
            >
              {t('attach')}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-6 hover:bg-black/5 rounded-l-none border-l border-black/5 dark:border-white/10"
            >
              <ChevronDown className="h-3 w-3 text-gray-500" />
            </Button>
          </div>

          <Separator
            orientation="vertical"
            className="mx-2 h-5 bg-black/10 dark:bg-white/10"
          />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 rounded-[3px] border border-transparent hover:border-black/5"
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 rounded-[3px] border border-transparent hover:border-black/5"
          >
            <Share className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 rounded-[3px] border border-transparent hover:border-black/5"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
