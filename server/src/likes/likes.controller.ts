import { Controller, Post, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('murmurs/:id/like')
  @UseGuards(JwtAuthGuard)
  like(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.likesService.like(userId, Number(id));
  }

  @Delete('murmurs/:id/like')
  @UseGuards(JwtAuthGuard)
  unlike(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.likesService.unlike(userId, Number(id));
  }
}
