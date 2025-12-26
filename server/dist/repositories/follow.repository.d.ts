import { Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';
import { IFollowRepository } from '../common/interfaces/repositories.interface';
export declare class FollowRepository implements IFollowRepository {
    private readonly repo;
    constructor(repo: Repository<Follow>);
    follow(followerId: number, followingId: number): Promise<void>;
    unfollow(followerId: number, followingId: number): Promise<void>;
    isFollowing(followerId: number, followingId: number): Promise<boolean>;
    getFollowingIds(userId: number): Promise<number[]>;
    getFollowerIds(userId: number): Promise<number[]>;
    countFollowing(userId: number): Promise<number>;
    countFollowers(userId: number): Promise<number>;
}
