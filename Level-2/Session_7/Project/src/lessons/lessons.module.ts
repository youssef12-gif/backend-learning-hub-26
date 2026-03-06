import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [CloudinaryModule, UserModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
