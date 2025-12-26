import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { FollowsService } from '../follows/follows.service';
export declare class MurmursController {
    private readonly murmursService;
    private readonly followsService;
    constructor(murmursService: MurmursService, followsService: FollowsService);
    private getUserId;
    getAll(req: any, xUserId: string | undefined): Promise<import("../services/murmur-enricher.service").EnrichedMurmur[]>;
    getOne(id: number, req: any, xUserId: string | undefined): Promise<import("../services/murmur-enricher.service").EnrichedMurmur>;
    getByUser(id: string, req: any, xUserId: string | undefined): Promise<import("../services/murmur-enricher.service").EnrichedMurmur[]>;
    timeline(req: any): Promise<import("../services/murmur-enricher.service").EnrichedMurmur[]>;
    createForMe(req: any, body: CreateMurmurDto): Promise<import("../services/murmur-enricher.service").EnrichedMurmur>;
    deleteForMe(req: any, id: number): Promise<{
        success: boolean;
    }>;
}
