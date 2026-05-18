'use client';

import React, { useState } from 'react';

import { SendHorizonal, Smile, Paperclip, Mic, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ChatInput() {
  const [message, setMessage] = useState('');
  const t = useTranslations('Chat');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="px-[20px] py-[15px] bg-[#F9F9F9]/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-black/5 dark:border-white/10 z-10">
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 max-w-full mx-auto"
      >
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="text-gray-500 hover:text-gray-700 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/10 h-9 w-9 rounded-[4px] transition-colors"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="text-gray-500 hover:text-gray-700 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/10 h-9 w-9 rounded-[4px] transition-colors hidden sm:flex"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 relative flex items-center">
          <Input
            type="text"
            placeholder={t('typeMessagePlaceholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-white dark:bg-gray-800 dark:text-gray-100 border border-black/5 dark:border-white/10 h-10 px-4 pr-12 rounded-[4px] focus-visible:ring-1 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 text-sm shadow-sm placeholder:text-gray-400"
            autoComplete="off"
          />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="absolute right-1 text-gray-400 hover:text-gray-600 h-8 w-8 rounded-[4px]"
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          {message.trim() ? (
            <Button
              type="submit"
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 text-white h-10 w-10 rounded-[4px] shadow-sm active:scale-95 transition-all"
            >
              <SendHorizonal className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white h-10 w-10 rounded-[4px] shadow-sm transition-colors"
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
