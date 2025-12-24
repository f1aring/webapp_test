import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Murmur } from './entities/murmur.entity';
import { MurmursController } from './murmurs/murmurs.controller';
import { MurmursService } from './murmurs/murmurs.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'docker',
      password: 'docker',
      database: 'test',
      entities: [User, Murmur],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Murmur]),
  ],
  controllers: [AppController, MurmursController],
  providers: [AppService, MurmursService],
})
export class AppModule {}
