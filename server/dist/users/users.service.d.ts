import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Follow } from '../entities/follow.entity';
export declare class UsersService {
    private readonly userRepo;
    private readonly followRepo;
    constructor(userRepo: Repository<User>, followRepo: Repository<Follow>);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<any>;
}
