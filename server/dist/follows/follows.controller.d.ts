import { FollowsService } from './follows.service';
export declare class FollowsController {
    private readonly followsService;
    constructor(followsService: FollowsService);
    follow(xUserId: string | undefined, id: string): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }> | {
        error: string;
    };
    unfollow(xUserId: string | undefined, id: string): Promise<{
        success: boolean;
    }> | {
        error: string;
    };
}
