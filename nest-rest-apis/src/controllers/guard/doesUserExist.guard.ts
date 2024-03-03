import { CanActivate, ExecutionContext, Injectable, ForbiddenException, Req, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { messages } from '../message';

@Injectable()
export class DoesUserExist implements CanActivate {
    constructor(private readonly userService: UserService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request:any) {
        const userEmailExist = await this.userService.findOneByEmail(request.body.email);
        if (userEmailExist) {
            throw new ForbiddenException(messages.EMAIL_DUPLICATE);
        }
        const userPhoneExist = await this.userService.findOneByPhoneNo(request.body.phone_no);
        if (userPhoneExist) {
            throw new ForbiddenException(messages.PHONE_DUPLICATE);
        }
        return true;
    }
}