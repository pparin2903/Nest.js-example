import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private readonly loginAPI;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        access_token: string;
    }>;
}
