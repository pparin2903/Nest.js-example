import { UsersService } from './users.service';
import { User } from './users.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findUsers(): Promise<User[]>;
    findUser(id: number): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, user: User): Promise<User>;
    deleteUser(id: number): Promise<void>;
}
