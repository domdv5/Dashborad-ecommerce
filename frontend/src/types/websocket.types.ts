import type { SaleEvent } from './sales.types';

export interface SocketEvents {
  'new-sale': (data: SaleEvent) => void;
  connect: () => void;
  disconnect: () => void;
  error: (error: Error) => void;
}

export interface SocketConfig {
  url: string;
  namespace: string;
  reconnectionAttempts: number;
  reconnectionDelay: number;
}
