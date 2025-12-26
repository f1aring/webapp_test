import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { FollowRepository } from '../repositories/follow.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly followRepository: FollowRepository,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) return null;

    const followCount = await this.followRepository.countFollowing(id);
    const followedCount = await this.followRepository.countFollowers(id);

    return {
      ...user,
      followCount,
      followedCount,
    };
  }
}

