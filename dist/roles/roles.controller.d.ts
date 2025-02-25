import { RolesService } from './roles.service';
import { Role } from './roles.entity';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    findRoles(): Promise<Role[]>;
    findRole(id: number): Promise<Role>;
    createRole(role: Role): Promise<Role>;
    updateRole(id: number, role: Role): Promise<Role>;
    deleteRole(id: number): Promise<void>;
}
