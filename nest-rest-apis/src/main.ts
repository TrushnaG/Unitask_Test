import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common'
import { join } from 'path';
import { ValidateInputPipe } from './config/pipe/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*'
  })
  app.useStaticAssets(join(__dirname, '../uploads'), {
    prefix: '/uploads'
  })
  const config = app.get(ConfigService)
  
  app.useGlobalPipes(new ValidateInputPipe());
  
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  
  const port = config.get('port')
  await app.listen(port, () =>{
    Logger.log(`Server is running on port ${port}`)
  });
}
bootstrap();
