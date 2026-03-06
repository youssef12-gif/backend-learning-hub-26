import { Module } from '@nestjs/common';
import { UserConroller } from './users.controller';
import { UserService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '5m' },
      }),
    }),
    CloudinaryModule,
  ],
  controllers: [UserConroller],
  providers: [UserService],
  exports: [JwtModule],
})
export class UserModule {}
