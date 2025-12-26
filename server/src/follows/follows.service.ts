import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepo: Repository<Follow>,
  ) {}

  async follow(followerId: number, followingId: number) {
    if (followerId === followingId) return { success: false, message: 'Cannot follow yourself' };
    const exists = await this.followRepo.findOne({ where: { followerId, followingId } });
    if (exists) return { success: true };
    const rel = this.followRepo.create({ followerId, followingId });
    await this.followRepo.save(rel);
    return { success: true };
  }

  async unfollow(followerId: number, followingId: number) {
    const rel = await this.followRepo.findOne({ where: { followerId, followingId } });
    if (!rel) return { success: true };
    await this.followRepo.remove(rel);
    return { success: true };
  }

  async getFollowingIds(userId: number): Promise<number[]> {
    const rows = await this.followRepo.find({ where: { followerId: userId } });
    return rows.map(r => r.followingId);
  }

  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    const rel = await this.followRepo.findOne({ where: { followerId, followingId } });
    return !!rel;
  }
}
