import { userRoles } from 'src/users/dto/CreateUserDto';

export interface JwtPayload {
  id: number;
  role: userRoles;
}
