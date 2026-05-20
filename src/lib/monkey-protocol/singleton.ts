import { SocketManager, SocketManagerOptions } from './SocketManager';

let socketManagerInstance: SocketManager | null = null;

export const initSocketManager = (options: SocketManagerOptions) => {
  if (typeof window === 'undefined') return null;
  if (!socketManagerInstance) {
    socketManagerInstance = new SocketManager(options);
  }
  return socketManagerInstance;
};

export const getSocketManager = () => socketManagerInstance;
