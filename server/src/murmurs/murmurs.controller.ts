import { Controller, Get, Post, Delete, Body, Headers, Param, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { FollowsService } from '../follows/follows.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api')
export class MurmursController {
  constructor(
    private readonly murmursService: MurmursService,
    private readonly followsService: FollowsService,
  ) {}

  private getUserId(req: any, xUserId?: string): number | undefined {
    if (req?.user?.id) return req.user.id;
    if (xUserId) return Number(xUserId);
    return undefined;
  }

  @Get('murmurs')
  getAll(@Request() req: any, @Headers('x-user-id') xUserId: string | undefined) {
    const currentUserId = this.getUserId(req, xUserId);
    return this.murmursService.findAll(currentUserId);
  }

  @Get('murmurs/:id')
  getOne(@Param('id', ParseIntPipe) id: number, @Request() req: any, @Headers('x-user-id') xUserId: string | undefined) {
    const currentUserId = this.getUserId(req, xUserId);
    return this.murmursService.findById(id, currentUserId);
  }

  @Get('users/:id/murmurs')
  getByUser(@Param('id') id: string, @Request() req: any, @Headers('x-user-id') xUserId: string | undefined) {
    const currentUserId = this.getUserId(req, xUserId);
    return this.murmursService.findByUser(Number(id), currentUserId);
  }

  @Get('me/timeline')
  @UseGuards(JwtAuthGuard)
  async timeline(@Request() req: any) {
    const userId = req.user.id;
    const following = await this.followsService.getFollowingIds(userId);
    const ids = [userId, ...following];
    return this.murmursService.findByUsers(ids, userId);
  }

  @Post('me/murmurs')
  @UseGuards(JwtAuthGuard)
  createForMe(@Request() req: any, @Body() body: CreateMurmurDto) {
    const userId = req.user.id;
    return this.murmursService.createForUser(userId, body);
  }

  @Delete('me/murmurs/:id')
  @UseGuards(JwtAuthGuard)
  deleteForMe(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    return this.murmursService.deleteForUser(userId, id);
  }
}
