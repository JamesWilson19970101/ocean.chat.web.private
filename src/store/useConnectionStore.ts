import { create } from 'zustand';

export type ConnectionStatus = 'connecting' | 'connected' | 'waiting' | 'offline' | 'failed';

interface ConnectionState {
  status: ConnectionStatus;
  retryCount: number;
  nextRetryTime: number | null; // Timestamp for countdown
  lastError: Error | null;

  // Actions
  setStatus: (status: ConnectionStatus) => void;
  setWaiting: (retryCount: number, nextRetryTime: number, error?: Error) => void;
  setFailed: (error: Error) => void;
  reset: () => void;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  status: 'offline', // Default to offline before initialization
  retryCount: 0,
  nextRetryTime: null,
  lastError: null,

  setStatus: (status) =>
    set(() => {
      // If connection succeeds or is attempting to connect, reset retry properties
      if (status === 'connected' || status === 'connecting') {
        return { status, retryCount: 0, nextRetryTime: null, lastError: null };
      }
      return { status };
    }),

  setWaiting: (retryCount, nextRetryTime, error) =>
    set({
      status: 'waiting',
      retryCount,
      nextRetryTime,
      lastError: error ?? null,
    }),

  setFailed: (error) =>
    set({
      status: 'failed',
      nextRetryTime: null,
      lastError: error,
    }),

  reset: () =>
    set({
      status: 'offline',
      retryCount: 0,
      nextRetryTime: null,
      lastError: null,
    }),
}));
