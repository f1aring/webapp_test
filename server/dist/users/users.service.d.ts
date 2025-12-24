import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    create(dto: CreateUserDto): Promise<User>;
}
