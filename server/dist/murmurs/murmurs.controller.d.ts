import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { FollowsService } from '../follows/follows.service';
export declare class MurmursController {
    private readonly murmursService;
    private readonly followsService;
    constructor(murmursService: MurmursService, followsService: FollowsService);
    getAll(xUserId: string | undefined): Promise<any[]>;
    getOne(id: number, xUserId: string | undefined): Promise<any>;
    getByUser(id: string, xUserId: string | undefined): Promise<any[]>;
    timeline(xUserId: string | undefined): Promise<any[] | {
        error: string;
    }>;
    createForMe(xUserId: string | undefined, body: CreateMurmurDto): Promise<any> | {
        error: string;
    };
    deleteForMe(xUserId: string | undefined, id: number): Promise<{
        success: boolean;
    }> | {
        error: string;
    };
}
