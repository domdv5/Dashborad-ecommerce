import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

export interface SaleEvent {
  transaction_id: string;
  timestamp: string;
  amount: number;
  category: string
  region: string
  user_id: string;
}

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/sales' })
export class SalesGateway {
  @WebSocketServer()
  server: Server;

  sendNewSale(sale: SaleEvent) {
    this.server.emit('new-sale', sale);
  }
}
