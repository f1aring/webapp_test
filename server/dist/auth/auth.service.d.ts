import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            isActive: boolean;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            isActive: boolean;
        };
        token: string;
    }>;
    validateUser(userId: number): Promise<User | null>;
}
