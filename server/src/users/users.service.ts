import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Follow } from '../entities/follow.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Follow)
    private readonly followRepo: Repository<Follow>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findById(id: number): Promise<any> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) return null;

    const followCount = await this.followRepo.count({ where: { followerId: id } });
    const followedCount = await this.followRepo.count({ where: { followingId: id } });

    return {
      ...user,
      followCount,
      followedCount,
    };
  }
}

