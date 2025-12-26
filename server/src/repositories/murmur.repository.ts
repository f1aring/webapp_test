import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Murmur } from '../entities/murmur.entity';
import { IMurmurRepository } from '../common/interfaces/repositories.interface';

@Injectable()
export class MurmurRepository implements IMurmurRepository {
  constructor(
    @InjectRepository(Murmur)
    private readonly repo: Repository<Murmur>,
  ) {}

  async findById(id: number): Promise<Murmur | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByUserId(userId: number, limit: number = 100): Promise<Murmur[]> {
    return this.repo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async findByUserIds(userIds: number[], limit: number = 100): Promise<Murmur[]> {
    if (!userIds || userIds.length === 0) return [];
    return this.repo.find({
      where: { userId: In(userIds) },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async findAll(limit: number = 100): Promise<Murmur[]> {
    return this.repo.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async create(murmur: Partial<Murmur>): Promise<Murmur> {
    const newMurmur = this.repo.create(murmur);
    return this.repo.save(newMurmur);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async count(userId?: number): Promise<number> {
    if (userId) {
      return this.repo.count({ where: { userId } });
    }
    return this.repo.count();
  }
}
