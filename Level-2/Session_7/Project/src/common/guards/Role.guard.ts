import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ReqWithUser } from '../interfaces/reqWithUser';
import { userRoles } from 'src/users/dto/CreateUserDto';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: ReqWithUser = context.switchToHttp().getRequest();
    if (request.currentUser.role !== userRoles.ADMIN) {
      throw new ForbiddenException('Access denied');
    }
    return true;
  }
}
