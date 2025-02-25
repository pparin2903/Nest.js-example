import { User } from './users.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findUsers(): Promise<User[]>;
    findUser(id: number): Promise<User>;
    findByUsername(user_name: string, password: string, ou: string): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, user: Partial<User>): Promise<User>;
    deleteUser(id: number): Promise<void>;
}
