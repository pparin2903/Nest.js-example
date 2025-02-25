import { UserDetail } from './user_details.entity';
import { Repository } from 'typeorm';
export declare class UserDetailsService {
    private userDetailRepository;
    constructor(userDetailRepository: Repository<UserDetail>);
    findUserDetails(): Promise<UserDetail[]>;
    findUserDetail(id: number): Promise<UserDetail>;
    createUserDetail(user_detail: UserDetail): Promise<UserDetail>;
    updateUserDetail(id: number, user_detail: Partial<UserDetail>): Promise<UserDetail>;
    deleteUserDetail(id: number): Promise<void>;
}
