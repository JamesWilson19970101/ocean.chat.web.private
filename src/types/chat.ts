export interface Room {
  id: string;
  name: string;
  lastMessage: string;
  avatarUrl: string;
  lastSeen: string;
  active?: boolean;
  unreadCount?: number;
  online?: boolean;
  lastActivityTime?: number;
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
  sendStatus?: 'SENDING' | 'SENT' | 'FAILED';
}

export interface CreateRoomDto {
  type: 'p' | 'c' | 'd';
  name: string;
  members: string[];
}

export interface CreateRoomResponse {
  groupId: string;
  name: string;
  type: string;
}
