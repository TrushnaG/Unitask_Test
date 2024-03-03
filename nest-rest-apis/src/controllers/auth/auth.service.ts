import { HttpException, Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { options } from 'src/config/options';
import { messages } from '../message';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, 
      private readonly configService: ConfigService) { }
    async validateToken(token: string): Promise<boolean> {
      try {
        const isValidToken = await this.jwtService.verify(token, { secret: this.configService.get<string>('secret') });
        return isValidToken;
      } catch (error) {
        if (error.message === 'jwt expired') {
          throw new HttpException({
            success: options.API_STATUS.FAILED,
            message: messages.JWT_EXPIRE,
          }, HttpStatus.UNAUTHORIZED);
        } else {
          throw new UnauthorizedException();
        }
      }
    }
}
