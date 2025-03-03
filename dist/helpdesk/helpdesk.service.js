"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpdeskService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let HelpdeskService = class HelpdeskService {
    constructor() {
        this.tickets = [
            { id: '1', user: 'John Doe', issue: 'Cannot login', status: 'pending' },
            { id: '2', user: 'Alice', issue: 'Payment failed', status: 'in-progress' },
        ];
    }
    getTickets() {
        return this.tickets;
    }
    updateStatus(ticketId, status) {
        const ticket = this.tickets.find((t) => t.id === ticketId);
        if (ticket) {
            ticket.status = status;
        }
        return ticket;
    }
    addTicket(user, issue) {
        const newTicket = {
            id: (0, uuid_1.v4)(),
            user,
            issue,
            status: 'pending',
        };
        this.tickets.push(newTicket);
        return newTicket;
    }
};
exports.HelpdeskService = HelpdeskService;
exports.HelpdeskService = HelpdeskService = __decorate([
    (0, common_1.Injectable)()
], HelpdeskService);
//# sourceMappingURL=helpdesk.service.js.map