import { Controller, Post, Delete, Param, Headers } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('api')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('murmurs/:id/like')
  like(@Headers('x-user-id') xUserId: string | undefined, @Param('id') id: string) {
    const userId = xUserId ? Number(xUserId) : undefined;
    if (!userId) return { error: 'Missing x-user-id header' };
    return this.likesService.like(userId, Number(id));
  }

  @Delete('murmurs/:id/like')
  unlike(@Headers('x-user-id') xUserId: string | undefined, @Param('id') id: string) {
    const userId = xUserId ? Number(xUserId) : undefined;
    if (!userId) return { error: 'Missing x-user-id header' };
    return this.likesService.unlike(userId, Number(id));
  }
}
