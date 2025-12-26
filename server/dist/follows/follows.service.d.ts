import { FollowRepository } from '../repositories/follow.repository';
export declare class FollowsService {
    private readonly followRepository;
    constructor(followRepository: FollowRepository);
    follow(followerId: number, followingId: number): Promise<{
        success: boolean;
    }>;
    unfollow(followerId: number, followingId: number): Promise<{
        success: boolean;
    }>;
    getFollowingIds(userId: number): Promise<number[]>;
    isFollowing(followerId: number, followingId: number): Promise<boolean>;
    getFollowerIds(userId: number): Promise<number[]>;
    countFollowing(userId: number): Promise<number>;
    countFollowers(userId: number): Promise<number>;
}
