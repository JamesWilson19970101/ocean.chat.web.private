'use client';

import React, { useState, useMemo, useEffect } from 'react';

import { Search, Users, X, Loader2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { groupService } from '@/services/http/group';
import { userService } from '@/services/http/user';
import { useRoomStore } from '@/store/useRoomStore';
import { UserProfile } from '@/types/auth';

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
  const [groupName, setGroupName] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
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

  const selectedUsers = useMemo(() => {
    return users.filter((user) => selectedUserIds.includes(user._id));
  }, [selectedUserIds, users]);

  const handleConfirm = async () => {
    if (selectedUserIds.length > 0 && groupName.trim()) {
      try {
        setIsSubmitting(true);
        const newRoomResponse = await groupService.createRoom({
          type: 'p',
          name: groupName.trim(),
          members: selectedUserIds,
        });

        const roomExists = useRoomStore
          .getState()
          .rooms.some((r) => r.id === newRoomResponse.groupId);
        if (!roomExists) {
          useRoomStore.getState().addRoom({
            id: newRoomResponse.groupId,
            name: newRoomResponse.name,
            lastMessage: '',
            avatarUrl: '',
            lastSeen: new Date().toISOString(),
            unreadCount: 0,
            active: false,
            online: false,
          });
        }

        toast.success(t('createSuccess'));
        setSearchQuery('');
        setGroupName('');
        setSelectedUserIds([]);
        onOpenChange(false);
      } catch (error) {
        // Error is handled globally by HTTP client interceptor
        console.error('Failed to create group chat', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSearchQuery('');
      setGroupName('');
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

        <div className="px-6 py-4 border-b flex flex-col gap-4 bg-white dark:bg-gray-950">
          <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-md px-3 bg-white dark:bg-gray-900 focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-shadow">
            <Users className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
            <Input
              placeholder={t('groupNamePlaceholder')}
              className="border-0 shadow-none focus-visible:ring-0 px-0 bg-transparent h-10"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md px-3">
            <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 shrink-0" />
            <Input
              placeholder={t('searchUser')}
              className="border-0 shadow-none focus-visible:ring-0 px-0 bg-transparent h-8 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSubmitting || isLoadingUsers || userError}
            />
          </div>
        </div>

        {selectedUsers.length > 0 && (
          <div className="px-6 py-3 border-b bg-gray-50 flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {selectedUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center bg-white border border-gray-200 rounded-full px-2 py-1 text-sm shadow-sm transition-all"
              >
                <Avatar className="h-5 w-5 mr-1.5">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-[10px]">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-gray-700">
                  {user.username}
                </span>
                <button
                  onClick={(e) => !isSubmitting && removeUser(user._id, e)}
                  className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                  disabled={isSubmitting}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <ScrollArea className="h-[260px]">
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
                {filteredUsers.map((user) => {
                  const isSelected = selectedUserIds.includes(user._id);
                  return (
                    <div
                      key={user._id}
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50/50 dark:bg-blue-900/10'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                      onClick={() => !isSubmitting && toggleUser(user._id)}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() =>
                          !isSubmitting && toggleUser(user._id)
                        }
                        className="pointer-events-none"
                        disabled={isSubmitting}
                      />
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
                    </div>
                  );
                })}
                {filteredUsers.length === 0 && (
                  <div className="flex h-32 items-center justify-center">
                    <p className="text-sm text-gray-500">{t('userNotFound')}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50/50 flex justify-between items-center sm:justify-between">
          <div className="text-sm text-gray-500">
            {t('hasSelected')}
            {selectedUserIds.length}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              {t('No')}
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={
                selectedUserIds.length === 0 ||
                !groupName.trim() ||
                isSubmitting
              }
            >
              {isSubmitting ? t('creating') : t('Yes')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
