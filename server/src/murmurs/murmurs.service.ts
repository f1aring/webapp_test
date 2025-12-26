import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { MurmurRepository } from '../repositories/murmur.repository';
import { UserRepository } from '../repositories/user.repository';
import { MurmurEnricherService } from '../services/murmur-enricher.service';
import { ResourceNotFoundException, ForbiddenException } from '../common/exceptions/business.exception';
import { User } from '../entities/user.entity';

@Injectable()
export class MurmursService {
  constructor(
    private readonly murmurRepository: MurmurRepository,
    private readonly userRepository: UserRepository,
    private readonly enricherService: MurmurEnricherService,
  ) {}

  async findById(id: number, currentUserId?: number) {
    const murmur = await this.murmurRepository.findById(id);
    if (!murmur) throw new ResourceNotFoundException('Murmur');
    
    const userMap = await this.buildUserMapTyped([murmur.userId]);
    const enriched = await this.enricherService.enrichMurmurs([murmur], userMap, currentUserId);
    return enriched[0];
  }

  async findAll(currentUserId?: number) {
    const murmurs = await this.murmurRepository.findAll();
    const userMap = await this.buildUserMapTyped([...new Set(murmurs.map(m => m.userId))]);
    return this.enricherService.enrichMurmurs(murmurs, userMap, currentUserId);
  }

  async findByUser(userId: number, currentUserId?: number) {
    const murmurs = await this.murmurRepository.findByUserId(userId);
    const userMap = await this.buildUserMapTyped([userId]);
    return this.enricherService.enrichMurmurs(murmurs, userMap, currentUserId);
  }

  async findByUsers(userIds: number[], currentUserId?: number, limit = 100) {
    const murmurs = await this.murmurRepository.findByUserIds(userIds, limit);
    const userMap = await this.buildUserMapTyped(userIds);
    return this.enricherService.enrichMurmurs(murmurs, userMap, currentUserId);
  }

  async createForUser(userId: number, dto: CreateMurmurDto) {
    const murmur = await this.murmurRepository.create({ userId, content: dto.content });
    const userMap = await this.buildUserMapTyped([userId]);
    const enriched = await this.enricherService.enrichMurmurs([murmur], userMap, userId);
    return enriched[0];
  }

  async deleteForUser(userId: number, id: number) {
    const murmur = await this.murmurRepository.findById(id);
    if (!murmur) throw new ResourceNotFoundException('Murmur');
    if (murmur.userId !== userId) throw new ForbiddenException('Cannot delete another user\'s murmur');
    
    await this.murmurRepository.delete(id);
    return { success: true };
  }


  private async buildUserMapTyped(userIds: number[]): Promise<Map<number, User>> {
    const uniqueIds = [...new Set(userIds)];
    const users = await Promise.all(
      uniqueIds.map(id => this.userRepository.findById(id)),
    );
    const filtered = users.filter((u): u is User => u !== null);
    return new Map(filtered.map(u => [u.id, u]));
  }
}
