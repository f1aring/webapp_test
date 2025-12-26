import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../common/interfaces/repositories.interface';
export declare class UserRepository implements IUserRepository {
    private readonly repo;
    constructor(repo: Repository<User>);
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    create(user: Partial<User>): Promise<User>;
    update(id: number, user: Partial<User>): Promise<User>;
}
