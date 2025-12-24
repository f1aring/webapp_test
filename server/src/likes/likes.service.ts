import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
  ) {}

  async like(userId: number, murmurId: number) {
    const existing = await this.likeRepo.findOne({ where: { userId, murmurId } });
    if (existing) return { success: true };
    const l = this.likeRepo.create({ userId, murmurId });
    await this.likeRepo.save(l);
    return { success: true };
  }

  async unlike(userId: number, murmurId: number) {
    const existing = await this.likeRepo.findOne({ where: { userId, murmurId } });
    if (!existing) return { success: true };
    await this.likeRepo.remove(existing);
    return { success: true };
  }

  async countLikes(murmurId: number) {
    return this.likeRepo.count({ where: { murmurId } });
  }

  async isLikedBy(userId: number, murmurId: number) {
    const existing = await this.likeRepo.findOne({ where: { userId, murmurId } });
    return !!existing;
  }
}
