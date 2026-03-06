import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export enum userRoles {
  USER = 'user',
  ADMIN = 'admin',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @Type(() => Number)
  @IsNumber()
  age: number;

  @IsEnum(userRoles)
  role: userRoles = userRoles.USER;

  @IsString()
  @MinLength(6, { message: 'password length must be more than 6 charachters' })
  password: string;

  @IsString()
  confirm_password: string;
}
