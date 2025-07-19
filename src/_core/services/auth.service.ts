import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserEntity } from "../entities/user.entity";
import { compare as bcryptCompare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserEntity> | never {
    const user: UserEntity = await this.usersService.getByEmail(email);

    const isPasswordMatching: boolean = await bcryptCompare(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException(
        `Attempt to login with this email: ${email}. Invalid password.`,
      );
    }

    return user;
  }
}
