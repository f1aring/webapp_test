import { Injectable } from '@nestjs/common';
import { Murmur } from '../entities/murmur.entity';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../common/interfaces/repositories.interface';
import { LikeRepository } from '../repositories/like.repository';

export interface EnrichedMurmur extends Murmur {
  user?: User;
  likeCount: number;
  isLiked: boolean;
}

/**
 * Service responsible for enriching murmurs with related data
 * (user info, like counts, etc.) - SRP applied
 */
@Injectable()
export class MurmurEnricherService {
  constructor(
    private readonly likeRepository: LikeRepository,
  ) {}

  async enrichMurmurs(
    murmurs: Murmur[],
    userMap: Map<number, User>,
    currentUserId?: number,
  ): Promise<EnrichedMurmur[]> {
    if (murmurs.length === 0) return [];

    const murmurIds = murmurs.map(m => m.id);
    const likeCounts = await this.getLikeCounts(murmurIds);
    const userLikes = await this.getUserLikes(murmurIds, currentUserId);

    return murmurs.map(murmur => ({
      ...murmur,
      user: userMap.get(murmur.userId),
      likeCount: likeCounts.get(murmur.id) || 0,
      isLiked: userLikes.has(murmur.id),
    }));
  }

  private async getLikeCounts(murmurIds: number[]): Promise<Map<number, number>> {
    const counts = new Map<number, number>();
    for (const murmurId of murmurIds) {
      counts.set(murmurId, await this.likeRepository.countByMurmur(murmurId));
    }
    return counts;
  }

  private async getUserLikes(
    murmurIds: number[],
    currentUserId?: number,
  ): Promise<Set<number>> {
    const likes = new Set<number>();
    if (!currentUserId) return likes;

    for (const murmurId of murmurIds) {
      const isLiked = await this.likeRepository.isLiked(currentUserId, murmurId);
      if (isLiked) likes.add(murmurId);
    }
    return likes;
  }
}
