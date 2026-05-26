'use client';

import React, { useState, useMemo, useEffect } from 'react';

import { Search, Loader2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { chatService } from '@/services/http/chat';
import { userService } from '@/services/http/user';
import { UserProfile } from '@/types/auth';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userError, setUserError] = useState(false);

  useEffect(() => {
    if (open) {
      let isMounted = true;
      const fetchUsers = async () => {
        setIsLoadingUsers(true);
        setUserError(false);
        try {
          const data = await userService.getAllUsers();
          if (isMounted) {
            setUsers(data);
          }
        } catch {
          if (isMounted) {
            setUserError(true);
            toast.error(t('loadUsersFailed'));
          }
        } finally {
          if (isMounted) {
            setIsLoadingUsers(false);
          }
        }
      };

      fetchUsers();

      return () => {
        isMounted = false;
      };
    }
  }, [open, t]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, users]);

  const handleConfirm = async () => {
    if (selectedUserId) {
      try {
        setIsSubmitting(true);
        const selectedUser = users.find((u) => u._id === selectedUserId);

        await chatService.createRoom({
          type: 'd',
          name: selectedUser?.username || 'Direct Chat',
          members: [selectedUserId],
        });

        toast.success(t('createSuccess'));
        setSearchQuery('');
        setSelectedUserId(null);
        onOpenChange(false);
      } catch (error) {
        // Error is handled globally by HTTP client interceptor
        console.error('Failed to create direct chat', error);
      } finally {
        setIsSubmitting(false);
      }
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
            disabled={isSubmitting || isLoadingUsers || userError}
          />
        </div>

        <ScrollArea className="h-[300px]">
          <div className="flex flex-col p-2">
            {isLoadingUsers ? (
              <div className="flex h-32 flex-col items-center justify-center gap-2 text-gray-500">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p className="text-sm">{t('loadingUsers')}</p>
              </div>
            ) : userError ? (
              <div className="flex h-32 flex-col items-center justify-center gap-2 text-red-500">
                <AlertCircle className="h-6 w-6" />
                <p className="text-sm">{t('loadUsersFailed')}</p>
              </div>
            ) : (
              <>
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                      selectedUserId === user._id
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={() => !isSubmitting && setSelectedUserId(user._id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                        {user.username}
                      </p>
                    </div>
                    {selectedUserId === user._id && (
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
              </>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50/50">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
          >
            {t('No')}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedUserId || isSubmitting}
          >
            {isSubmitting ? t('creating') : t('Yes')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
