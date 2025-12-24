import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(body: any): Promise<{
        id: number;
        email: string;
        name: string;
    }>;
    login(body: any): Promise<{
        access_token: string;
    }>;
}
