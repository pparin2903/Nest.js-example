import { Ou } from './ous.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class OusService {
    private ouRepository;
    private jwtService;
    constructor(ouRepository: Repository<Ou>, jwtService: JwtService);
    findOus(): Promise<Ou[]>;
    findOu(id: number): Promise<Ou>;
    createOu(ou: Ou): Promise<Ou>;
    updateOu(id: number, ou: Partial<Ou>): Promise<Ou>;
    deleteOu(id: number): Promise<void>;
    findOuByUser(token: string): Promise<any>;
}
