import { Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';
export declare class FollowsService {
    private readonly followRepo;
    constructor(followRepo: Repository<Follow>);
    follow(followerId: number, followingId: number): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
    unfollow(followerId: number, followingId: number): Promise<{
        success: boolean;
    }>;
    getFollowingIds(userId: number): Promise<number[]>;
    isFollowing(followerId: number, followingId: number): Promise<boolean>;
}
