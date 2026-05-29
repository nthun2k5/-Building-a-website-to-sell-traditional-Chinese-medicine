import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.getOrThrow<number>('server.port');
  const host = configService.getOrThrow<string>('server.host');
  const apiPrefix = configService.getOrThrow<string>('server.apiPrefix');

  app.setGlobalPrefix(apiPrefix);

  await app.listen(port);

  console.log(`Application is running on: http://${host}:${port}/${apiPrefix}`);
}
bootstrap();