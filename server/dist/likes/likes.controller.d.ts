import { LikesService } from './likes.service';
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
    like(req: any, id: string): Promise<{
        success: boolean;
    }>;
    unlike(req: any, id: string): Promise<{
        success: boolean;
    }>;
}
