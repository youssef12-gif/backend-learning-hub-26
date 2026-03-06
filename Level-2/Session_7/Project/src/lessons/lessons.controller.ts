import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/common/guards/authentication.guard';
import { RoleGuard } from 'src/common/guards/Role.guard';
import type { ReqWithUser } from 'src/common/interfaces/reqWithUser';
import { VideoPipe } from 'src/common/pipes/upload-video.pipe';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  @UseInterceptors(FileInterceptor('video'))
  create(
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFile(new VideoPipe())
    video: Express.Multer.File,
    @Req() req: ReqWithUser,
  ) {
    return this.lessonsService.create(
      createLessonDto,
      video,
      req.currentUser.id,
    );
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
