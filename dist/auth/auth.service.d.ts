import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(user_name: string, password: string, ou: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
