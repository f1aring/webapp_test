import { FollowsService } from './follows.service';
export declare class FollowsController {
    private readonly followsService;
    constructor(followsService: FollowsService);
    checkFollow(req: any, id: string): Promise<boolean>;
    follow(req: any, id: string): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
    unfollow(req: any, id: string): Promise<{
        success: boolean;
    }>;
}
