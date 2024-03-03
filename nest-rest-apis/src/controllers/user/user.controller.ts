import { Controller, Body, Post, Res, HttpStatus, Req, UseInterceptors, UploadedFile, Get, UseGuards } from '@nestjs/common';
import { messages } from '../message';
import { UserService } from './user.service';
import { options } from 'src/config/options';
import { AuthJwtInterceptor } from '../interceptors/auth-jwt.interceptors';
import { DoesUserExist } from '../guard/doesUserExist.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

  @Post('login')
  async login(@Res() response:any,
    @Body('email') email: string,
    @Body('password') password: string) {
    const userdata = await this.userService.userLogin(email, password)
    return response.status(HttpStatus.OK).json({ success: options.API_STATUS.SUCCESS, message: messages.LOGIN_SUCCESS, data: userdata })
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  @UseInterceptors()
  async signUp(@Res() response:any,
    @Body('full_name') FullName: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('phone_no') PhoneNo: string,
    @Body('gender') gender: string) {
    const userdata = await this.userService.userSignUp(FullName, email, password, PhoneNo, gender)
    return response.status(HttpStatus.OK).json({ success: options.API_STATUS.SUCCESS, message: messages.SIGNUP_SUCCESS, data: userdata })
  }

  @Get('me')
  @UseInterceptors(AuthJwtInterceptor)
  async viewProfile(@Req() request:any, @Res() response:any){
  const userData = await this.userService.viewMyProfile(request.user.user_id)
  return response.status(HttpStatus.OK).json({ success: options.API_STATUS.SUCCESS, message: messages.GET_PROFILE, data: userData })
  }

  @Get('logout')
  @UseInterceptors(AuthJwtInterceptor)
  async logOut(@Req() request:any, @Res() response:any){
    const userData = await this.userService.userLogOut(request.user.user_id)
    if(userData){
      return response.status(HttpStatus.OK).json({ success: options.API_STATUS.SUCCESS, message: messages.LOGOUT_SUCCESS })
    } else {
      return response.status(HttpStatus.OK).json({ success: options.API_STATUS.FAILED, message: messages.LOGOUT_FAILED })

    }
  
  }
}
