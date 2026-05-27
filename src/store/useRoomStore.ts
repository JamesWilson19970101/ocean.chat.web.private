import { create } from 'zustand';

import type { Room } from '@/types/chat';

interface RoomState {
  rooms: Room[];
}

interface RoomActions {
  setRooms: (rooms: Room[]) => void;
  addRoom: (room: Room) => void;
  clearRooms: () => void;
}

export const useRoomStore = create<RoomState & RoomActions>((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  addRoom: (room) => set((state) => ({ rooms: [room, ...state.rooms] })),
  clearRooms: () => set({ rooms: [] }),
}));
