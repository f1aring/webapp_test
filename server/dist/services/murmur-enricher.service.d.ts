import { Murmur } from '../entities/murmur.entity';
import { User } from '../entities/user.entity';
import { LikeRepository } from '../repositories/like.repository';
export interface EnrichedMurmur extends Murmur {
    user?: User;
    likeCount: number;
    isLiked: boolean;
}
export declare class MurmurEnricherService {
    private readonly likeRepository;
    constructor(likeRepository: LikeRepository);
    enrichMurmurs(murmurs: Murmur[], userMap: Map<number, User>, currentUserId?: number): Promise<EnrichedMurmur[]>;
    private getLikeCounts;
    private getUserLikes;
}
