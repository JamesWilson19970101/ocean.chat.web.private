'use client';

import React, { useState, useMemo } from 'react';

import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

interface CreateGroupChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGroupChatModal({
  open,
  onOpenChange,
}: CreateGroupChatModalProps) {
  const t = useTranslations('PrivateGroup');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const selectedUsers = useMemo(() => {
    return MOCK_USERS.filter((user) => selectedUserIds.includes(user.id));
  }, [selectedUserIds]);

  const handleConfirm = () => {
    if (selectedUserIds.length > 0) {
      console.log('Mock: Creating group chat with user IDs:', selectedUserIds);
      setSearchQuery('');
      setSelectedUserIds([]);
      onOpenChange(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSearchQuery('');
      setSelectedUserIds([]);
    }
    onOpenChange(newOpen);
  };

  const toggleUser = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const removeUser = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
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

        {selectedUsers.length > 0 && (
          <div className="px-6 py-3 border-b bg-gray-50 flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {selectedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center bg-white border border-gray-200 rounded-full px-2 py-1 text-sm shadow-sm transition-all"
              >
                <Avatar className="h-5 w-5 mr-1.5">
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-[10px]">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-gray-700">
                  {user.username}
                </span>
                <button
                  onClick={(e) => removeUser(user.id, e)}
                  className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <ScrollArea className="h-[260px]">
          <div className="flex flex-col p-2">
            {filteredUsers.map((user) => {
              const isSelected = selectedUserIds.includes(user.id);
              return (
                <div
                  key={user.id}
                  className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-50/50 dark:bg-blue-900/10'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => toggleUser(user.id)}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleUser(user.id)}
                    className="pointer-events-none"
                  />
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
                </div>
              );
            })}
            {filteredUsers.length === 0 && (
              <div className="flex h-32 items-center justify-center">
                <p className="text-sm text-gray-500">{t('userNotFound')}</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50/50 flex justify-between items-center sm:justify-between">
          <div className="text-sm text-gray-500">
            {t('hasSelected')}
            {selectedUserIds.length}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              {t('No')}
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={selectedUserIds.length === 0}
            >
              {t('Yes')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
