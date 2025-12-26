import { Controller, Get, Post, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Get('me/follow/:id')
  @UseGuards(JwtAuthGuard)
  checkFollow(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.followsService.isFollowing(userId, Number(id));
  }

  @Post('me/follow/:id')
  @UseGuards(JwtAuthGuard)
  follow(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.followsService.follow(userId, Number(id));
  }

  @Delete('me/follow/:id')
  @UseGuards(JwtAuthGuard)
  unfollow(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.followsService.unfollow(userId, Number(id));
  }
}
