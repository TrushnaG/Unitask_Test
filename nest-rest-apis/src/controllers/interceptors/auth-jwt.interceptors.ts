import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/controllers/auth/auth.service';
import { options } from 'src/config/options';
import { messages } from '../message';

@Injectable()
export class AuthJwtInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) { }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['x-access-token'];
    if (!token) {
      throw new HttpException({
        success: options.API_STATUS.FAILED,
        message: messages.NO_TOKEN,
      }, HttpStatus.FORBIDDEN);
    }
    const item = await this.authService.validateToken(token)
    request.user = item
    return next.handle();
  }
}