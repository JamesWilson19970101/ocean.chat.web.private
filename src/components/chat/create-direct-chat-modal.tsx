'use client';

import React, { useState, useMemo } from 'react';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MOCK_USERS } from '@/lib/mock-data';

interface CreateDirectChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDirectChatModal({
  open,
  onOpenChange,
}: CreateDirectChatModalProps) {
  const t = useTranslations('DirectChat');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const handleConfirm = () => {
    if (selectedUserId) {
      // In a real application, this would trigger an API call to create the room
      console.log('Mock: Creating direct chat with user ID:', selectedUserId);

      // Reset internal state and close modal
      setSearchQuery('');
      setSelectedUserId(null);
      onOpenChange(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSearchQuery('');
      setSelectedUserId(null);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>{t('new')}</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-2 border-b flex items-center bg-gray-50/50">
          <Search className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
          <Input
            placeholder={t('searchUser')}
            className="border-0 shadow-none focus-visible:ring-0 px-0 bg-transparent h-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ScrollArea className="h-[300px]">
          <div className="flex flex-col p-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                  selectedUserId === user.id
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setSelectedUserId(user.id)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                    {user.username}
                  </p>
                </div>
                {selectedUserId === user.id && (
                  <div className="flex shrink-0 items-center justify-center h-5 w-5 rounded-full border border-blue-500 bg-blue-500">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="flex h-32 items-center justify-center">
                <p className="text-sm text-gray-500">{t('userNotFound')}</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50/50">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            {t('No')}
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedUserId}>
            {t('Yes')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
