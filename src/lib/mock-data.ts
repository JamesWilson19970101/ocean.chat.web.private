import { Room, Message } from '@/types/chat';

export interface MockUser {
  id: string;
  username: string;
  avatarUrl: string;
}

export const MOCK_USERS: MockUser[] = [
  { id: 'u1', username: 'Alice Smith', avatarUrl: '/avatars/alice.png' },
  { id: 'u2', username: 'Bob Johnson', avatarUrl: '/avatars/bob.png' },
  { id: 'u3', username: 'Charlie Brown', avatarUrl: '/avatars/charlie.png' },
  { id: 'u4', username: 'David Lee', avatarUrl: '/avatars/david.png' },
  { id: 'u5', username: 'Eva Green', avatarUrl: '/avatars/eva.png' },
  { id: 'u6', username: 'Frank Wright', avatarUrl: '/avatars/frank.png' },
  { id: 'u7', username: 'Grace Kelly', avatarUrl: '/avatars/grace.png' },
  { id: 'u8', username: 'Henry Ford', avatarUrl: '/avatars/henry.png' },
];

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Was that designed by you?',
    avatarUrl: '/avatars/john.png',
    lastSeen: '2 hours ago',
    unreadCount: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Altana Sunz',
    lastMessage: 'Last seen 2 hours ago',
    avatarUrl: '/avatars/altana.png',
    lastSeen: '2 hours ago',
    online: false,
  },
  {
    id: '3',
    name: 'Hugo Alias',
    lastMessage: 'Last seen 2 hours ago',
    avatarUrl: '/avatars/hugo.png',
    lastSeen: '2 hours ago',
    online: true,
  },
];

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export const getMockMessages = (roomId: string): Message[] => [
  {
    id: 'm1',
    sender: 'John Doe',
    text: 'Oh! Where can I see it?',
    timestamp: '09:59 AM',
    isOwn: false,
    avatarUrl: '/avatars/john.png',
    type: 'text',
  },
  {
    id: 'm2',
    sender: 'You',
    text: 'I can pass you the Figma link if you want',
    timestamp: '10:00 AM',
    isOwn: true,
    type: 'text',
  },
  {
    id: 'm3',
    sender: 'John Doe',
    text: 'Pass me the link so I can take a look',
    timestamp: '10:01 AM',
    isOwn: false,
    avatarUrl: '/avatars/john.png',
    type: 'text',
  },
  {
    id: 'm4',
    sender: 'You',
    text: 'https://www.figma.com/file/oViJFBccNZdkdXmQ1LsS3u/Litee-Design-Team?node-id=138%3A2858',
    timestamp: '10:02 AM',
    isOwn: true,
    isLink: true,
    type: 'text',
  },
  {
    id: 'm5',
    sender: 'John Doe',
    text: 'Oh! It’s amazing!! It looks so real and it makes me feel like it’s designed by Microsoft',
    timestamp: '10:05 AM',
    isOwn: false,
    avatarUrl: '/avatars/john.png',
    type: 'text',
  },
  {
    id: 'm6',
    sender: 'You',
    text: 'Thanks 😀',
    timestamp: '10:06 AM',
    isOwn: true,
    type: 'text',
  },
  {
    id: 'm7',
    sender: 'John Doe',
    timestamp: '10:10 AM',
    isOwn: false,
    avatarUrl: '/avatars/john.png',
    type: 'audio',
    duration: '0:12',
  },
];
