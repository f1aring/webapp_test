import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Murmur } from '../entities/murmur.entity';
import { CreateMurmurDto } from './dto/create-murmur.dto';

@Injectable()
export class MurmursService {
  constructor(
    @InjectRepository(Murmur)
    private readonly murmurRepo: Repository<Murmur>,
  ) {}

  findAll(): Promise<Murmur[]> {
    return this.murmurRepo.find({ order: { createdAt: 'DESC' } });
  }

  findByUser(userId: number): Promise<Murmur[]> {
    return this.murmurRepo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  findByUsers(userIds: number[], limit = 100): Promise<Murmur[]> {
    if (!userIds || userIds.length === 0) return Promise.resolve([]);
    return this.murmurRepo.find({ where: { userId: In(userIds) }, order: { createdAt: 'DESC' }, take: limit });
  }

  async createForUser(userId: number, dto: CreateMurmurDto) {
    const murmur = this.murmurRepo.create({ userId, content: dto.content });
    return this.murmurRepo.save(murmur);
  }

  async deleteForUser(userId: number, id: number) {
    const murmur = await this.murmurRepo.findOne({ where: { id } });
    if (!murmur) throw new NotFoundException('Murmur not found');
    if (murmur.userId !== userId) throw new ForbiddenException();
    await this.murmurRepo.remove(murmur);
    return { success: true };
  }
}
