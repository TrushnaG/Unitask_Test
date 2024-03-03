import { Controller, Res, HttpStatus, UseInterceptors, Get  } from '@nestjs/common';
import { messages } from '../message';
import { RandomjokeService } from './randomjoke.service';
import { options } from 'src/config/options';
import { AuthJwtInterceptor } from '../interceptors/auth-jwt.interceptors';
import { ConfigService } from '@nestjs/config';

@Controller()
export class RandomjokeController {
    constructor(private readonly randomjokeService: RandomjokeService) { }

  @Get('random-joke')
  @UseInterceptors(AuthJwtInterceptor)
  async randomJoke(@Res() response:any) {
    const jokeData = await this.randomjokeService.getRandomJoke()
    return response.status(HttpStatus.OK).json({ success: options.API_STATUS.SUCCESS, message: messages.GET_API_SUCCESS, data: jokeData })
  }
}
