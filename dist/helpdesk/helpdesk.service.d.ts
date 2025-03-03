interface Ticket {
    id: string;
    user: string;
    issue: string;
    status: 'pending' | 'in-progress' | 'resolved';
}
export declare class HelpdeskService {
    private tickets;
    getTickets(): Ticket[];
    updateStatus(ticketId: string, status: 'pending' | 'in-progress' | 'resolved'): Ticket | undefined;
    addTicket(user: string, issue: string): Ticket;
}
export {};
