'use client';

import React from 'react';

import { Search, House, Frame, Clock3, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SidebarHeader() {
  const t = useTranslations('Chat');

  return (
    <div className="flex flex-col">
      <div className="p-2 flex space-x-3 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 active:bg-transparent active:text-gray-300 w-4 h-4 ml-3"
        >
          <House className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 active:bg-transparent active:text-gray-300 w-4 h-4"
        >
          <Frame className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-2">
        <div className="relative flex items-center gap-2">
          <div className="flex items-center flex-1 h-8 bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
            <Input
              placeholder={t('searchRoomPlaceholder')}
              className="flex-grow h-full bg-transparent border-none shadow-none rounded-none focus-visible:ring-0 px-3 text-sm text-gray-900 placeholder:text-gray-500"
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:bg-transparent h-full px-2"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 w-8 h-8"
            >
              <Clock3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 w-8 h-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
