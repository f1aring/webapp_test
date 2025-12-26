import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { ILikeRepository } from '../common/interfaces/repositories.interface';
export declare class LikeRepository implements ILikeRepository {
    private readonly repo;
    constructor(repo: Repository<Like>);
    like(userId: number, murmurId: number): Promise<void>;
    unlike(userId: number, murmurId: number): Promise<void>;
    isLiked(userId: number, murmurId: number): Promise<boolean>;
    countByMurmur(murmurId: number): Promise<number>;
    findByMurmur(murmurId: number): Promise<Like[]>;
}
