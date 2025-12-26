import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Murmur } from './entities/murmur.entity';
import { MurmursController } from './murmurs/murmurs.controller';
import { MurmursService } from './murmurs/murmurs.service';
import { Follow } from './entities/follow.entity';
import { Like } from './entities/like.entity';
import { FollowsController } from './follows/follows.controller';
import { FollowsService } from './follows/follows.service';
import { LikesService } from './likes/likes.service';
import { LikesController } from './likes/likes.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'docker',
      password: 'docker',
      database: 'test',
      entities: [User, Murmur, Follow, Like],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Murmur, Follow, Like]),
    AuthModule,
  ],
  controllers: [AppController, MurmursController, FollowsController, LikesController, UsersController],
  providers: [AppService, MurmursService, FollowsService, LikesService, UsersService],
})
export class AppModule {}
