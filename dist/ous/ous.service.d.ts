import { Ou } from './ous.entity';
import { Repository } from 'typeorm';
export declare class OusService {
    private ouRepository;
    constructor(ouRepository: Repository<Ou>);
    findOus(): Promise<Ou[]>;
    findOu(id: number): Promise<Ou>;
    createOu(ou: Ou): Promise<Ou>;
    updateOu(id: number, ou: Partial<Ou>): Promise<Ou>;
    deleteOu(id: number): Promise<void>;
}
