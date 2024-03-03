import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { messages } from '../message';
import User from 'src/models/users.model';
import { commonRes } from './common.response';
import { options } from 'src/config/options';
import { commonFunc } from '../common.functions';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private users: typeof User,
    private readonly jwtService: JwtService, 
    private readonly configService: ConfigService){}

    async userLogin(email: string, password: string) {
      if (!email || email == "" || !password || password == "") {
      throw new HttpException({ success: options.API_STATUS.FAILED, message: messages.REQUIRED_FIELD }, HttpStatus.OK);
    }
        const userdata = await this.users.findOne({ where: { email:email }, attributes: ["id", "full_name", "email", "password"] })
        const userData = JSON.parse(JSON.stringify(userdata))
        if (!userData) {
          throw new HttpException({ success: options.API_STATUS.FAILED, message: messages.NO_USERDATA, }, HttpStatus.OK);
        }
        const passwordValid = await commonFunc.passwordCompare(password, userData.password )
        if (!passwordValid) {
          throw new HttpException({ success: options.API_STATUS.FAILED, message: messages.INVALID_PASSWORD, }, HttpStatus.OK);
        }
        const accessToken = await this.jwtService.signAsync({ user_id: userData.id });
        const result = commonRes.logInRes(userData.id, userData.full_name, userData.email, userData.phone_no, accessToken)
        return result
      }

      async findOneByEmail(email: string): Promise<User> {
        return await this.users.findOne({ where: { email } });
    }

    async findOneByPhoneNo(phone_no: string): Promise<User> {
      return await this.users.findOne({ where: { phone_no } });
  }

      async userSignUp(FullName: string, email: string, password: string, PhoneNo: string, gender: string, ) {
        if (!email || email == "" || !password || password == "" || !FullName || FullName == "" ||
          !PhoneNo || PhoneNo == "" || !gender || gender == "") {
          throw new HttpException({ success: options.API_STATUS.FAILED, message: messages.REQUIRED_FIELD }, HttpStatus.OK);
        }
        if (password.length < 6) {
          throw new HttpException({ success: options.API_STATUS.FAILED, message: messages.PWD_LENGTH_VALIDATE }, HttpStatus.OK);
        }
       const userData = await this.users.create({
        full_name: FullName,
        email: email,
        password: await commonFunc.generateHashPassword(password, 8),
        phone_no: PhoneNo,
        gender: gender
      })
      if (!userData) {
        throw new HttpException({ success: options.API_STATUS.FAILED, message: messages.SERVER_ERROR, }, HttpStatus.OK);
      }
      const accessToken =await this.jwtService.signAsync({ user_id: userData.id });
      const result = commonRes.signUpRes(userData.id, userData.full_name, userData.email, userData.phone_no, userData.gender, accessToken)
      return result
      }

      async viewMyProfile(id: number) {
        const profileData = await this.users.findByPk(id,
          {attributes:["id","full_name","email","phone_no","gender"]          })
          const profile = JSON.parse(JSON.stringify(profileData))
        return profile;
      }

      async userLogOut(id: number) {
        const profileData = await this.users.findByPk(id,
          {attributes:["id","full_name","email","phone_no","gender"]          })
        if(profileData){
          return true;
        } else{
          return false;
        }
      }
}
