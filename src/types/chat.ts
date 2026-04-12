export interface Room {
  id: string;
  name: string;
  lastMessage: string;
  avatarUrl: string;
  lastSeen: string;
  active?: boolean;
  unreadCount?: number;
  online?: boolean;
}

export interface Message {
  id: string;
  sender: string;
  text?: string;
  timestamp: string;
  isOwn: boolean;
  avatarUrl?: string;
  isLink?: boolean;
  type?: 'text' | 'audio' | 'image' | 'file';
  duration?: string;
  fileName?: string;
  fileSize?: string;
}
