import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Murmur } from '../entities/murmur.entity';
import { User } from '../entities/user.entity';
import { Like } from '../entities/like.entity';
import { CreateMurmurDto } from './dto/create-murmur.dto';

@Injectable()
export class MurmursService {
  constructor(
    @InjectRepository(Murmur)
    private readonly murmurRepo: Repository<Murmur>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
  ) {}

  private async enrichMurmurs(murmurs: Murmur[], currentUserId?: number): Promise<any[]> {
    const userIds = [...new Set(murmurs.map(m => m.userId))];
    const users = await this.userRepo.find({ where: { id: In(userIds) } });
    const userMap = new Map(users.map(u => [u.id, u]));

    const murmurIds = murmurs.map(m => m.id);
    const likes = murmurIds.length > 0 
      ? await this.likeRepo.find({ where: { murmurId: In(murmurIds) } })
      : [];
    
    const likeCounts = new Map<number, number>();
    const userLikes = new Map<number, Set<number>>(); // murmurId -> Set of userIds

    likes.forEach(like => {
      likeCounts.set(like.murmurId, (likeCounts.get(like.murmurId) || 0) + 1);
      if (!userLikes.has(like.murmurId)) {
        userLikes.set(like.murmurId, new Set());
      }
      userLikes.get(like.murmurId)!.add(like.userId);
    });

    return murmurs.map(murmur => ({
      ...murmur,
      user: userMap.get(murmur.userId),
      likeCount: likeCounts.get(murmur.id) || 0,
      isLiked: currentUserId ? userLikes.get(murmur.id)?.has(currentUserId) : false,
    }));
  }

  async findAll(currentUserId?: number): Promise<any[]> {
    const murmurs = await this.murmurRepo.find({ order: { createdAt: 'DESC' } });
    return this.enrichMurmurs(murmurs, currentUserId);
  }

  async findByUser(userId: number, currentUserId?: number): Promise<any[]> {
    const murmurs = await this.murmurRepo.find({ where: { userId }, order: { createdAt: 'DESC' } });
    return this.enrichMurmurs(murmurs, currentUserId);
  }

  async findByUsers(userIds: number[], currentUserId?: number, limit = 100): Promise<any[]> {
    if (!userIds || userIds.length === 0) return Promise.resolve([]);
    const murmurs = await this.murmurRepo.find({ 
      where: { userId: In(userIds) }, 
      order: { createdAt: 'DESC' }, 
      take: limit 
    });
    return this.enrichMurmurs(murmurs, currentUserId);
  }

  async createForUser(userId: number, dto: CreateMurmurDto) {
    const murmur = this.murmurRepo.create({ userId, content: dto.content });
    const saved = await this.murmurRepo.save(murmur);
    return this.enrichMurmurs([saved], userId).then(arr => arr[0]);
  }

  async deleteForUser(userId: number, id: number) {
    const murmur = await this.murmurRepo.findOne({ where: { id } });
    if (!murmur) throw new NotFoundException('Murmur not found');
    if (murmur.userId !== userId) throw new ForbiddenException();
    await this.murmurRepo.remove(murmur);
    return { success: true };
  }
}
