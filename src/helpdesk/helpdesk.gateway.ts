import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HelpdeskService } from './helpdesk.service';

@WebSocketGateway({ cors: true })
export class HelpdeskGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly helpdeskService: HelpdeskService) {}

  @SubscribeMessage('getTickets')
  handleGetTickets() {
    this.server.emit('tickets', this.helpdeskService.getTickets());
  }

  @SubscribeMessage('updateStatus')
  handleUpdateStatus(
    @MessageBody() { ticketId, status }: { ticketId: string; status: string },
  ) {
    this.helpdeskService.updateStatus(ticketId, status as any);
    this.server.emit('tickets', this.helpdeskService.getTickets());
  }

  @SubscribeMessage('addTicket')
  handleAddTicket(
    @MessageBody() { user, issue }: { user: string; issue: string },
  ) {
    const newTicket = this.helpdeskService.addTicket(user, issue);
    this.server.emit('tickets', this.helpdeskService.getTickets()); // ส่งข้อมูลใหม่ให้ทุก Client
  }
}
