import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { usersData } from 'src/users/users.service';

const lessons: Lesson[] = [];
@Injectable()
export class LessonsService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async create(
    createLessonDto: CreateLessonDto,
    video: Express.Multer.File,
    admin_id: number,
  ) {
    const admin = usersData.find((u) => u.id === admin_id);
    if (!admin) {
      throw new NotFoundException('admin not found');
    }
    const videoRes = await this.cloudinaryService.uploadVideo(
      video,
      'lessons/videos',
    );

    const newLesson: Lesson = {
      title: createLessonDto.title,
      admin_id,
      video_url: videoRes.url,
    };

    lessons.push(newLesson);
    return newLesson;
  }

  findAll() {
    return lessons;
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
