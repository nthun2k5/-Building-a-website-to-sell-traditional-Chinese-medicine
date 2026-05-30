import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import logger from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.getOrThrow<number>('server.port') ?? logger('Server port is not defined in the configuration', 'error');
  const host = configService.getOrThrow<string>('server.host') ?? logger('Server host is not defined in the configuration', 'error');
  const apiPrefix = configService.getOrThrow<string>('server.apiPrefix') ?? logger('Server API prefix is not defined in the configuration', 'error');

  // Kích hoạt bộ chuyển đổi và kiểm soát tính hợp lệ dữ liệu toàn cục
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Loại bỏ các trường nằm ngoài khai báo của DTO
    transform: true, // Tự động ép kiểu dữ liệu từ JSON sang kiểu định nghĩa trong DTO
  }));

  app.setGlobalPrefix(apiPrefix);

  await app.listen(port, host);

  logger(`Server is running on http://${host}:${port}/${apiPrefix}`);
}
bootstrap();