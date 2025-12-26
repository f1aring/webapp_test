import { Injectable } from '@nestjs/common';
import { LikeRepository } from '../repositories/like.repository';

@Injectable()
export class LikesService {
  constructor(private readonly likeRepository: LikeRepository) {}

  async like(userId: number, murmurId: number) {
    await this.likeRepository.like(userId, murmurId);
    return { success: true };
  }

  async unlike(userId: number, murmurId: number) {
    await this.likeRepository.unlike(userId, murmurId);
    return { success: true };
  }

  async countLikes(murmurId: number): Promise<number> {
    return this.likeRepository.countByMurmur(murmurId);
  }

  async isLikedBy(userId: number, murmurId: number): Promise<boolean> {
    return this.likeRepository.isLiked(userId, murmurId);
  }
}
