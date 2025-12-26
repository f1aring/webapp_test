import { Controller, Get, Post, Delete, Body, Headers, Param, ParseIntPipe } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { FollowsService } from '../follows/follows.service';

@Controller('api')
export class MurmursController {
  constructor(
    private readonly murmursService: MurmursService,
    private readonly followsService: FollowsService,
  ) {}

  @Get('murmurs')
  getAll(@Headers('x-user-id') xUserId: string | undefined) {
    const currentUserId = xUserId ? Number(xUserId) : undefined;
    return this.murmursService.findAll(currentUserId);
  }

  @Get('murmurs/:id')
  getOne(@Param('id', ParseIntPipe) id: number, @Headers('x-user-id') xUserId: string | undefined) {
    const currentUserId = xUserId ? Number(xUserId) : undefined;
    return this.murmursService.findById(id, currentUserId);
  }

  @Get('users/:id/murmurs')
  getByUser(@Param('id') id: string, @Headers('x-user-id') xUserId: string | undefined) {
    const currentUserId = xUserId ? Number(xUserId) : undefined;
    return this.murmursService.findByUser(Number(id), currentUserId);
  }

  @Get('me/timeline')
  async timeline(@Headers('x-user-id') xUserId: string | undefined) {
    const userId = xUserId ? Number(xUserId) : undefined;
    if (!userId) return { error: 'Missing x-user-id header' };
    const following = await this.followsService.getFollowingIds(userId);
    const ids = [userId, ...following];
    return this.murmursService.findByUsers(ids, userId);
  }

  @Post('me/murmurs')
  createForMe(@Headers('x-user-id') xUserId: string | undefined, @Body() body: CreateMurmurDto) {
    const userId = xUserId ? Number(xUserId) : (body as any).userId;
    if (!userId) {
      return { error: 'Missing x-user-id header or body.userId' };
    }
    return this.murmursService.createForUser(userId, body);
  }

  @Delete('me/murmurs/:id')
  deleteForMe(@Headers('x-user-id') xUserId: string | undefined, @Param('id', ParseIntPipe) id: number) {
    const userId = xUserId ? Number(xUserId) : undefined;
    if (!userId) {
      return { error: 'Missing x-user-id header' };
    }
    return this.murmursService.deleteForUser(userId, id);
  }
}
