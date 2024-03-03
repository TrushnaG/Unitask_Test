import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import User from 'src/models/users.model';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([User]),
  JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory: async(configService: ConfigService) =>({
      secret: configService.get<string>("JWTKEY"),
      signOptions: {
        expiresIn: configService.get<string>("TOKEN_EXPIRATION"),
      },
    }),
    inject:[ConfigService]
  }), AuthModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
