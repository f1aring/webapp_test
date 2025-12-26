import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { ILikeRepository } from '../common/interfaces/repositories.interface';

@Injectable()
export class LikeRepository implements ILikeRepository {
  constructor(
    @InjectRepository(Like)
    private readonly repo: Repository<Like>,
  ) {}

  async like(userId: number, murmurId: number): Promise<void> {
    const exists = await this.isLiked(userId, murmurId);
    if (!exists) {
      const like = this.repo.create({ userId, murmurId });
      await this.repo.save(like);
    }
  }

  async unlike(userId: number, murmurId: number): Promise<void> {
    await this.repo.delete({ userId, murmurId });
  }

  async isLiked(userId: number, murmurId: number): Promise<boolean> {
    const like = await this.repo.findOne({ where: { userId, murmurId } });
    return !!like;
  }

  async countByMurmur(murmurId: number): Promise<number> {
    return this.repo.count({ where: { murmurId } });
  }

  async findByMurmur(murmurId: number): Promise<Like[]> {
    return this.repo.find({ where: { murmurId } });
  }
}
