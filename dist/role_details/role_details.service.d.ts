import { Repository } from 'typeorm';
import { RoleDetail } from './role_details.entity';
export declare class RoleDetailsService {
    private roleDetailRepository;
    constructor(roleDetailRepository: Repository<RoleDetail>);
    findRoleDetails(): Promise<RoleDetail[]>;
    findRoleDetail(id: number): Promise<RoleDetail>;
    createRoleDetail(role_detail: RoleDetail): Promise<RoleDetail>;
    updateRoleDetail(id: number, role_detail: Partial<RoleDetail>): Promise<RoleDetail>;
    deleteUserDetail(id: number): Promise<void>;
}
