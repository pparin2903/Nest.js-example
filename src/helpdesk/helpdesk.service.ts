import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface Ticket {
  id: string;
  user: string;
  issue: string;
  status: 'pending' | 'in-progress' | 'resolved';
}

@Injectable()
export class HelpdeskService {
  private tickets: Ticket[] = [
    { id: '1', user: 'John Doe', issue: 'Cannot login', status: 'pending' },
    { id: '2', user: 'Alice', issue: 'Payment failed', status: 'in-progress' },
  ];

  getTickets(): Ticket[] {
    return this.tickets;
  }

  updateStatus(
    ticketId: string,
    status: 'pending' | 'in-progress' | 'resolved',
  ) {
    const ticket = this.tickets.find((t) => t.id === ticketId);
    if (ticket) {
      ticket.status = status;
    }
    return ticket;
  }

  addTicket(user: string, issue: string) {
    const newTicket: Ticket = {
      id: uuidv4(), // Generate unique ID
      user,
      issue,
      status: 'pending',
    };
    this.tickets.push(newTicket);
    return newTicket;
  }
}
