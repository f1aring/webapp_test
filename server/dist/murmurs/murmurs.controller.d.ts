import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';
export declare class MurmursController {
    private readonly murmursService;
    constructor(murmursService: MurmursService);
    getAll(): Promise<import("../entities/murmur.entity").Murmur[]>;
    createForMe(xUserId: string | undefined, body: CreateMurmurDto): Promise<import("../entities/murmur.entity").Murmur> | {
        error: string;
    };
    deleteForMe(xUserId: string | undefined, id: number): Promise<{
        success: boolean;
    }> | {
        error: string;
    };
}
