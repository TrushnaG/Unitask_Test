import { Injectable,ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import User from 'src/models/users.model';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { messages } from '../message';

@Injectable()
export class RandomjokeService {
    constructor(@InjectModel(User) private users: typeof User,
    private readonly jwtService: JwtService){}

    async getRandomJoke() {
        const response = await axios({
            method: 'GET',
            url: 'https://api.chucknorris.io/jokes/random',
          }).catch(() => {
            throw new ForbiddenException(messages.NO_API);
          });

          return {
              joke: response.data?.value
          };
      }
}
