import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';
import { IFollowRepository } from '../common/interfaces/repositories.interface';

@Injectable()
export class FollowRepository implements IFollowRepository {
  constructor(
    @InjectRepository(Follow)
    private readonly repo: Repository<Follow>,
  ) {}

  async follow(followerId: number, followingId: number): Promise<void> {
    const exists = await this.isFollowing(followerId, followingId);
    if (!exists) {
      const follow = this.repo.create({ followerId, followingId });
      await this.repo.save(follow);
    }
  }

  async unfollow(followerId: number, followingId: number): Promise<void> {
    await this.repo.delete({ followerId, followingId });
  }

  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    const follow = await this.repo.findOne({ where: { followerId, followingId } });
    return !!follow;
  }

  async getFollowingIds(userId: number): Promise<number[]> {
    const follows = await this.repo.find({ where: { followerId: userId } });
    return follows.map(f => f.followingId);
  }

  async getFollowerIds(userId: number): Promise<number[]> {
    const follows = await this.repo.find({ where: { followingId: userId } });
    return follows.map(f => f.followerId);
  }

  async countFollowing(userId: number): Promise<number> {
    return this.repo.count({ where: { followerId: userId } });
  }

  async countFollowers(userId: number): Promise<number> {
    return this.repo.count({ where: { followingId: userId } });
  }
}
