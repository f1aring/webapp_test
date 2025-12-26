import { Repository } from 'typeorm';
import { Murmur } from '../entities/murmur.entity';
import { User } from '../entities/user.entity';
import { Like } from '../entities/like.entity';
import { CreateMurmurDto } from './dto/create-murmur.dto';
export declare class MurmursService {
    private readonly murmurRepo;
    private readonly userRepo;
    private readonly likeRepo;
    constructor(murmurRepo: Repository<Murmur>, userRepo: Repository<User>, likeRepo: Repository<Like>);
    private enrichMurmurs;
    findById(id: number, currentUserId?: number): Promise<any>;
    findAll(currentUserId?: number): Promise<any[]>;
    findByUser(userId: number, currentUserId?: number): Promise<any[]>;
    findByUsers(userIds: number[], currentUserId?: number, limit?: number): Promise<any[]>;
    createForUser(userId: number, dto: CreateMurmurDto): Promise<any>;
    deleteForUser(userId: number, id: number): Promise<{
        success: boolean;
    }>;
}
