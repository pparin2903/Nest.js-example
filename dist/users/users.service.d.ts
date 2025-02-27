import { User } from './users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    findUsers(): Promise<User[]>;
    findUser(id: number): Promise<User>;
    findByUsername(user_name: string, password: string): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, user: Partial<User>): Promise<User>;
    updateUserState(token: string, state: string): Promise<any>;
    deleteUser(id: number): Promise<void>;
}
