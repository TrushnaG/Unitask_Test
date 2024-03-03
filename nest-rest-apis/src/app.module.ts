import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from "path";
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from './controllers/auth/auth.module';
import { UserModule } from './controllers/user/user.module';
import { RandomjokeModule } from './controllers/randomjoke/randomjoke.module';
import configuration from './config/configuration';

@Module({
  imports: [
  ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
    load: [configuration]
  }),
  ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'uploads')}),
   DatabaseModule, AuthModule, UserModule, RandomjokeModule],
  controllers: [AppController],
  providers: [AppService],
  exports:[ConfigModule]
})
export class AppModule {}
