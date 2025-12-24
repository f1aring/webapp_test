import { Controller, Post, Delete, Param, Headers } from '@nestjs/common';
import { FollowsService } from './follows.service';

@Controller('api')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post('me/follow/:id')
  follow(@Headers('x-user-id') xUserId: string | undefined, @Param('id') id: string) {
    const userId = xUserId ? Number(xUserId) : undefined;
    if (!userId) return { error: 'Missing x-user-id header' };
    return this.followsService.follow(userId, Number(id));
  }

  @Delete('me/follow/:id')
  unfollow(@Headers('x-user-id') xUserId: string | undefined, @Param('id') id: string) {
    const userId = xUserId ? Number(xUserId) : undefined;
    if (!userId) return { error: 'Missing x-user-id header' };
    return this.followsService.unfollow(userId, Number(id));
  }
}
