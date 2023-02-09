import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/jwt.constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: jwtConstant.secret,
    signOptions: { expiresIn: '24h' },
  }),
],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy]
})
export class UsersModule {}
