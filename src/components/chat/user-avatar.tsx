'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  src?: string;
  alt?: string;
  fallbackText?: string;
  className?: string;
}

export function UserAvatar({
  src,
  alt,
  fallbackText,
  className,
}: UserAvatarProps) {
  const t = useTranslations('Chat');

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  };

  return (
    <Avatar className={cn('h-10 w-10', className)}>
      <AvatarImage src={src} alt={alt || t('userAvatar')} />
      <AvatarFallback>{fallbackText || getInitials(alt)}</AvatarFallback>
    </Avatar>
  );
}
