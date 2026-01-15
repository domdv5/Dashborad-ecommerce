import { io, type Socket } from 'socket.io-client';
import type { SocketConfig } from '@/types/websocket.types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

const socketConfig: SocketConfig = {
  url: SOCKET_URL,
  namespace: '/sales',
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
};

let socketInstance: Socket | null = null;

export function initializeSocket(): Socket {
  if (socketInstance) {
    return socketInstance;
  }

  socketInstance = io(`${socketConfig.url}${socketConfig.namespace}`, {
    reconnectionAttempts: socketConfig.reconnectionAttempts,
    reconnectionDelay: socketConfig.reconnectionDelay,
    transports: ['websocket', 'polling'],
  });

  return socketInstance;
}

export function getSocket(): Socket | null {
  return socketInstance;
}

export function disconnectSocket(): void {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}
