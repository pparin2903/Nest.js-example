import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(user_name: string, password: string): Promise<any>;
    login(user: any): Promise<{
        id: any;
        user_name: any;
        first_name: any;
        last_name: any;
        role_code: any;
        access_token: string;
    }>;
}
