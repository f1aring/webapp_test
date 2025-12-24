import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
export declare class LikesService {
    private readonly likeRepo;
    constructor(likeRepo: Repository<Like>);
    like(userId: number, murmurId: number): Promise<{
        success: boolean;
    }>;
    unlike(userId: number, murmurId: number): Promise<{
        success: boolean;
    }>;
    countLikes(murmurId: number): Promise<number>;
    isLikedBy(userId: number, murmurId: number): Promise<boolean>;
}
