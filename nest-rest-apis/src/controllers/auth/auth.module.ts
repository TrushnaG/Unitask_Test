import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
    imports: [
      JwtModule.registerAsync({
        imports:[ConfigModule],
        useFactory: async(configService: ConfigService) =>({
          secret: configService.get<string>("JWTKEY"),
          signOptions: {
            expiresIn: configService.get<string>("TOKEN_EXPIRATION"),
          },
        }),
        inject:[ConfigService]
      })],
      controllers: [AuthController],
      providers: [AuthService],
      exports: [AuthService]
})
export class AuthModule {}
