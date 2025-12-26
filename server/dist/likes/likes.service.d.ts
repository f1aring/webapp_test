import { LikeRepository } from '../repositories/like.repository';
export declare class LikesService {
    private readonly likeRepository;
    constructor(likeRepository: LikeRepository);
    like(userId: number, murmurId: number): Promise<{
        success: boolean;
    }>;
    unlike(userId: number, murmurId: number): Promise<{
        success: boolean;
    }>;
    countLikes(murmurId: number): Promise<number>;
    isLikedBy(userId: number, murmurId: number): Promise<boolean>;
}
