'use client';

import React, { useState } from 'react';

import { Search, Plus, Settings, User, Users, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { CreateDirectChatModal } from '@/components/chat/create-direct-chat-modal';
import { CreateGroupChatModal } from '@/components/chat/create-group-chat-modal';
import { UserAvatar } from '@/components/chat/user-avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { appEventBus } from '@/lib/event-bus';
import { useAuthStore } from '@/store/useAuthStore';

export function SidebarHeader() {
  const t = useTranslations('Chat');
  const user = useAuthStore((state) => state.user);
  const [isDirectModalOpen, setIsDirectModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    appEventBus.emit('auth:logout', { force: false });
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex flex-col">
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
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-600 w-8 h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('new')}</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setIsDirectModalOpen(true)}
                >
                  <User className="mr-2 h-4 w-4 text-gray-500" />
                  {t('directMessage')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setIsGroupModalOpen(true)}
                >
                  <Users className="mr-2 h-4 w-4 text-gray-500" />
                  {t('privateGroup')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-600 w-8 h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('personalSettings')}</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="start" className="w-48">
                <div className="flex items-center justify-start gap-2 p-2">
                  <UserAvatar className="h-8 w-8" />
                  <div className="flex flex-col space-y-0.5 leading-none min-w-0">
                    <p className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                      {user?.username || 'User'}
                      {/* TODO: display real username */}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {/* <DropdownMenuLabel className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                  {t('account')}
                </DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{t('profile')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{t('preferences')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50"
                  onClick={() => setIsLogoutModalOpen(true)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <CreateDirectChatModal
        open={isDirectModalOpen}
        onOpenChange={setIsDirectModalOpen}
      />
      <CreateGroupChatModal
        open={isGroupModalOpen}
        onOpenChange={setIsGroupModalOpen}
      />

      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('logoutConfirmTitle')}</DialogTitle>
            <DialogDescription>{t('logoutConfirmMessage')}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              {t('cancel')}
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              {t('confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
