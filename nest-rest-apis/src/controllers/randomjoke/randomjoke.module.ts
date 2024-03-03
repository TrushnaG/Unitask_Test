import { Module } from '@nestjs/common';
import { RandomjokeController } from './randomjoke.controller';
import { RandomjokeService } from './randomjoke.service';
import { SequelizeModule } from '@nestjs/sequelize';
import User from 'src/models/users.model';
import { JwtModule } from '@nestjs/jwt';
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
  controllers: [RandomjokeController],
  providers:[RandomjokeService]
})
export class RandomjokeModule {}
