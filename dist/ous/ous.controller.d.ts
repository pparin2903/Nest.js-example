import { OusService } from './ous.service';
import { Ou } from './ous.entity';
export declare class OusController {
    private readonly ousService;
    constructor(ousService: OusService);
    findOuByUser(req: any): Promise<void>;
    findOus(): Promise<Ou[]>;
    findOu(id: number): Promise<Ou>;
    createOu(ou: Ou): Promise<Ou>;
    updateOu(id: number, role: Ou): Promise<Ou>;
    deleteOu(id: number): Promise<void>;
}
