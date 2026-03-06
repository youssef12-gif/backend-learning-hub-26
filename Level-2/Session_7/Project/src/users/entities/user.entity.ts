import { userRoles } from '../dto/CreateUserDto';

export interface UserEntity {
  id: number;
  email: string;
  username: string;
  age: number;
  role: userRoles;
  password: string;
  avatar: string;
}
