import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
