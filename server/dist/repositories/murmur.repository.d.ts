import { Repository } from 'typeorm';
import { Murmur } from '../entities/murmur.entity';
import { IMurmurRepository } from '../common/interfaces/repositories.interface';
export declare class MurmurRepository implements IMurmurRepository {
    private readonly repo;
    constructor(repo: Repository<Murmur>);
    findById(id: number): Promise<Murmur | null>;
    findByUserId(userId: number, limit?: number): Promise<Murmur[]>;
    findByUserIds(userIds: number[], limit?: number): Promise<Murmur[]>;
    findAll(limit?: number): Promise<Murmur[]>;
    create(murmur: Partial<Murmur>): Promise<Murmur>;
    delete(id: number): Promise<void>;
    count(userId?: number): Promise<number>;
}
