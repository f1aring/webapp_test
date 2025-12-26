import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  getAll() {
    return this.usersService.findAll();
  }

  @Get('users/:id')
  getOne(@Param('id') id: string) {
    return this.usersService.findById(Number(id));
  }
}

