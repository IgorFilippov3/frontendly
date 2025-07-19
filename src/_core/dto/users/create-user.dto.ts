import { UserRole } from "src/_core/models/user-role";

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
