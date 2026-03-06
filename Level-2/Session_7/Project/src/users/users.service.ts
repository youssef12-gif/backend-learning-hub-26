import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import usersJson from '../common/data/users.json';
import { UserEntity } from './entities/user.entity';

import * as fs from 'fs';
import * as path from 'path';

import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/Login.dto';
import { JwtPayload } from 'src/common/interfaces/jwtPayload';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProfilePictureUrl } from 'src/common/assets/defaultPhotos';

export const usersData = usersJson as unknown as UserEntity[];
const filePath = path.join(
  process.cwd(),
  'src',
  'common',
  'data',
  'users.json',
);

@Injectable()
export class UserService {
  private readonly saltRound = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  getAllUsers() {
    return usersData.map((u) => ({
      email: u.email,
      username: u.username,
      role: u.role,
      age: u.age,
    }));
  }

  async createUser(dto: CreateUserDto, image?: Express.Multer.File) {
    const { email, username, age, password, confirm_password, role } = dto;
    if (password !== confirm_password) {
      throw new BadRequestException("passwords don't match");
    }

    const userExists = usersData.find((u) => u.email === email);
    if (userExists) {
      throw new BadRequestException('user with this email already exists');
    }
    const hashedPassword = bcrypt.hashSync(password, this.saltRound);

    let avatar = ProfilePictureUrl;
    if (image) {
      const imageRes = await this.cloudinaryService.uploadImage(
        image,
        'users/avatar',
      );
      avatar = imageRes.url;
    }

    const newUser: UserEntity = {
      id: usersData.length > 0 ? usersData[usersData.length - 1].id + 1 : 1,
      email,
      username,
      password: hashedPassword,
      age,
      role,
      avatar,
    };
    usersData.push(newUser);
    await fs.promises.writeFile(filePath, JSON.stringify(usersData, null, 2));

    return {
      newUser,
    };
  }

  async login({ email, password }: LoginDto) {
    const userFound = usersData.find(
      (user) => user.email === email,
    ) as UserEntity;
    if (!userFound)
      throw new UnauthorizedException('Invalid email or password');
    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Invalid email or password');
    const token = await this.generateToken(userFound);
    return { token };
  }

  async generateToken(user: UserEntity) {
    const payload: JwtPayload = {
      id: user.id,
      role: user.role,
    };
    return await this.jwtService.signAsync(payload);
  }
}
