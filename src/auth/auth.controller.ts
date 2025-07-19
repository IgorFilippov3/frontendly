import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  Session,
} from "@nestjs/common";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { CreateUserDto } from "src/_core/dto/users/create-user.dto";
import { LoginUserDto } from "src/_core/dto/users/login-user.dto";
import { UserEntity } from "src/_core/entities/user.entity";
import { AuthService } from "src/_core/services/auth.service";
import { UsersService } from "src/_core/services/users.service";
import { GetUserId } from "src/_core/utils/get-user-id";

@Controller("auth")
export class AuthController {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get("me")
  async me(@GetUserId() userId: number): Promise<{ user: UserEntity | null }> {
    const user: UserEntity | null = await this.usersService.me(userId);

    return { user };
  }

  @Post("login")
  async login(
    @Body() { email, password }: LoginUserDto,
    @Session() session: Record<string, any>,
  ): Promise<void> {
    this.logger.log(`Login attempt for email: ${email}`);

    const validatedUser: UserEntity = await this.authService.validateUser({
      email,
      password,
    });

    session.userId = validatedUser.id;

    this.logger.log(`User logged in successfully with ID: ${validatedUser.id}`);
  }

  @Post("signup")
  async signup(
    @Body() model: CreateUserDto,
    @Session() session: Record<string, any>,
  ): Promise<void> {
    const newUser: UserEntity = await this.usersService.createUser(model);
    session.userId = newUser.id;

    this.logger.log(
      `User with email: ${newUser.email} was created and logged in`,
    );
  }

  @Post("logout")
  logout(
    @GetUserId() userId: number,
    @Req() request: ExpressRequest,
    @Res() response: ExpressResponse,
  ): void {
    request.session.destroy((error) => {
      if (error) {
        this.logger.error(`Logout failed for user ${userId}: ${error.message}`);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: "Logout failed",
        });
      }

      response.clearCookie("connect.sid");
      this.logger.log(`User with id ${userId} was logged out successfully`);

      return response.json({
        message: "Logout successful",
      });
    });
  }
}
