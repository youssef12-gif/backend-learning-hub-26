import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserService } from './users.service';
import { LoginDto } from './dto/Login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagePipe } from 'src/common/pipes/upload-image.pipe';

@Controller('users')
@Injectable()
export class UserConroller {
  constructor(private readonly userServie: UserService) {}
  // @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.userServie.getAllUsers();
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  createUser(
    @Body() body: CreateUserDto,
    @UploadedFile(new ImagePipe(false))
    image?: Express.Multer.File,
  ) {
    return this.userServie.createUser(body, image);
  }

  // image/png
  // image/jpg
  // video/mp4

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.userServie.login(body);
  }
}
