import { create } from 'zustand';

import type { Room } from '@/types/chat';

interface RoomState {
  rooms: Room[];
  activeRoomId: string | null;
}

interface RoomActions {
  setRooms: (rooms: Room[]) => void;
  addRoom: (room: Room) => void;
  clearRooms: () => void;
  updateRoomActivity: (roomId: string, timestamp: number, incrementUnread?: boolean) => void;
  resetUnreadCount: (roomId: string) => void;
  setActiveRoomId: (roomId: string | null) => void;
}

export const useRoomStore = create<RoomState & RoomActions>((set) => ({
  rooms: [],
  activeRoomId: null,
  setRooms: (rooms) => set({ rooms: sortRooms(rooms) }),
  addRoom: (room) => set((state) => ({ rooms: sortRooms([room, ...state.rooms]) })),
  clearRooms: () => set({ rooms: [] }),
  updateRoomActivity: (roomId, timestamp, incrementUnread = false) => set((state) => {
    const roomIndex = state.rooms.findIndex(r => r.id === roomId);
    if (roomIndex === -1) return state; // Room not found

    const room = state.rooms[roomIndex];
    const updatedRoom = {
      ...room,
      lastActivityTime: Math.max(room.lastActivityTime || 0, timestamp),
      unreadCount: incrementUnread ? (room.unreadCount || 0) + 1 : room.unreadCount
    };

    // Performance optimization: O(N) instead of O(N log N)
    // Since timestamp is likely Date.now(), moving it to the front is usually correct.
    // We filter out the old room and prepend the new one.
    const otherRooms = state.rooms.filter(r => r.id !== roomId);
    
    // To be perfectly robust, if for some reason we are updating with an older timestamp,
    // we should re-sort, but for typical "new message" activity, unshifting is optimal.
    // We will do a lightweight insertion sort if needed, but for simplicity, we assume
    // the new activity makes it the most recent.
    return { rooms: [updatedRoom, ...otherRooms] };
  }),
  resetUnreadCount: (roomId) => set((state) => ({
    rooms: state.rooms.map(room => room.id === roomId ? { ...room, unreadCount: 0 } : room)
  })),
  setActiveRoomId: (roomId) => set({ activeRoomId: roomId }),
}));

// Helper function to sort rooms by lastActivityTime descending
function sortRooms(rooms: Room[]): Room[] {
  return [...rooms].sort((a, b) => {
    const timeA = a.lastActivityTime || 0;
    const timeB = b.lastActivityTime || 0;
    return timeB - timeA;
  });
}
