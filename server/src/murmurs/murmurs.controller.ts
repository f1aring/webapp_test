import { Controller, Get, Post, Delete, Body, Headers, Param, ParseIntPipe } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';

@Controller('api')
export class MurmursController {
  constructor(private readonly murmursService: MurmursService) {}

  @Get('murmurs')
  getAll() {
    return this.murmursService.findAll();
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
