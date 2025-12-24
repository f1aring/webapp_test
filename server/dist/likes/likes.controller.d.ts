import { LikesService } from './likes.service';
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
    like(xUserId: string | undefined, id: string): Promise<{
        success: boolean;
    }> | {
        error: string;
    };
    unlike(xUserId: string | undefined, id: string): Promise<{
        success: boolean;
    }> | {
        error: string;
    };
}
