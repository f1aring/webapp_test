import { CreateMurmurDto } from './dto/create-murmur.dto';
import { MurmurRepository } from '../repositories/murmur.repository';
import { UserRepository } from '../repositories/user.repository';
import { MurmurEnricherService } from '../services/murmur-enricher.service';
export declare class MurmursService {
    private readonly murmurRepository;
    private readonly userRepository;
    private readonly enricherService;
    constructor(murmurRepository: MurmurRepository, userRepository: UserRepository, enricherService: MurmurEnricherService);
    findById(id: number, currentUserId?: number): Promise<import("../services/murmur-enricher.service").EnrichedMurmur>;
    findAll(currentUserId?: number): Promise<import("../services/murmur-enricher.service").EnrichedMurmur[]>;
    findByUser(userId: number, currentUserId?: number): Promise<import("../services/murmur-enricher.service").EnrichedMurmur[]>;
    findByUsers(userIds: number[], currentUserId?: number, limit?: number): Promise<import("../services/murmur-enricher.service").EnrichedMurmur[]>;
    createForUser(userId: number, dto: CreateMurmurDto): Promise<import("../services/murmur-enricher.service").EnrichedMurmur>;
    deleteForUser(userId: number, id: number): Promise<{
        success: boolean;
    }>;
    private buildUserMapTyped;
}
