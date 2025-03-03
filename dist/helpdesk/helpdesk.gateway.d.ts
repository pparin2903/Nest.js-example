import { Server } from 'socket.io';
import { HelpdeskService } from './helpdesk.service';
export declare class HelpdeskGateway {
    private readonly helpdeskService;
    server: Server;
    constructor(helpdeskService: HelpdeskService);
    handleGetTickets(): void;
    handleUpdateStatus({ ticketId, status }: {
        ticketId: string;
        status: string;
    }): void;
    handleAddTicket({ user, issue }: {
        user: string;
        issue: string;
    }): void;
}
