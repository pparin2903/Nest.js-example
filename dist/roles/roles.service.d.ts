import { Role } from './roles.entity';
import { Repository } from 'typeorm';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    findRoles(): Promise<Role[]>;
    findRole(id: number): Promise<Role>;
    createRole(role: Role): Promise<Role>;
    updateRole(id: number, role: Partial<Role>): Promise<Role>;
    deleteRole(id: number): Promise<void>;
}
