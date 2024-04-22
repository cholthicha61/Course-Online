import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';

config();
const { PORT } = process.env;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['log', 'debug', 'error', 'warn'],
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(PORT);
  console.log('server run on', PORT);
}

bootstrap();
