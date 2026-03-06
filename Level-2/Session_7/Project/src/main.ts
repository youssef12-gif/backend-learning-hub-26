import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalInterceptor } from './common/interceptors/globalInterceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new globalInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
