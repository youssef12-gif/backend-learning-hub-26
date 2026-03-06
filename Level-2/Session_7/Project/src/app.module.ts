import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, CloudinaryModule, LessonsModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
