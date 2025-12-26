import { Injectable } from '@nestjs/common';
import { FollowRepository } from '../repositories/follow.repository';
import { BusinessException } from '../common/exceptions/business.exception';

@Injectable()
export class FollowsService {
  constructor(private readonly followRepository: FollowRepository) {}

  async follow(followerId: number, followingId: number) {
    if (followerId === followingId) {
      throw new BusinessException('Cannot follow yourself');
    }
    await this.followRepository.follow(followerId, followingId);
    return { success: true };
  }

  async unfollow(followerId: number, followingId: number) {
    await this.followRepository.unfollow(followerId, followingId);
    return { success: true };
  }

  async getFollowingIds(userId: number): Promise<number[]> {
    return this.followRepository.getFollowingIds(userId);
  }

  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    return this.followRepository.isFollowing(followerId, followingId);
  }

  async getFollowerIds(userId: number): Promise<number[]> {
    return this.followRepository.getFollowerIds(userId);
  }

  async countFollowing(userId: number): Promise<number> {
    return this.followRepository.countFollowing(userId);
  }

  async countFollowers(userId: number): Promise<number> {
    return this.followRepository.countFollowers(userId);
  }
}
