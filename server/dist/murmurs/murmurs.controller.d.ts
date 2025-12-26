import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { FollowsService } from '../follows/follows.service';
export declare class MurmursController {
    private readonly murmursService;
    private readonly followsService;
    constructor(murmursService: MurmursService, followsService: FollowsService);
    private getUserId;
    getAll(req: any, xUserId: string | undefined): Promise<any[]>;
    getOne(id: number, req: any, xUserId: string | undefined): Promise<any>;
    getByUser(id: string, req: any, xUserId: string | undefined): Promise<any[]>;
    timeline(req: any): Promise<any[]>;
    createForMe(req: any, body: CreateMurmurDto): Promise<any>;
    deleteForMe(req: any, id: number): Promise<{
        success: boolean;
    }>;
}
