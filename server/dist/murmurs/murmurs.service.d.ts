import { Repository } from 'typeorm';
import { Murmur } from '../entities/murmur.entity';
import { CreateMurmurDto } from './dto/create-murmur.dto';
export declare class MurmursService {
    private readonly murmurRepo;
    constructor(murmurRepo: Repository<Murmur>);
    findAll(): Promise<Murmur[]>;
    createForUser(userId: number, dto: CreateMurmurDto): Promise<Murmur>;
    deleteForUser(userId: number, id: number): Promise<{
        success: boolean;
    }>;
}
