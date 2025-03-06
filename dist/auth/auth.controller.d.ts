import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private authService;
    private readonly userService;
    private readonly loginAPI;
    constructor(authService: AuthService, userService: UsersService);
    login(body: any): Promise<{
        id: any;
        user_name: any;
        first_name: any;
        last_name: any;
        role_code: any;
        access_token: string;
    }>;
}
