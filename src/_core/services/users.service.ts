import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/users/create-user.dto";
import { UserEntity } from "../entities/user.entity";
import { hash as bcryptHash } from "bcrypt";
import { QueryFailedError, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "../models/user-role";
import { generateSlug } from "../utils/generate-slug";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(this.constructor.name);
  private uniqueViolationCode: string = "23505";

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private configService: ConfigService,
  ) {
    this.seedAdminUser();
  }

  async seedAdminUser(): Promise<void> {
    const username = this.configService.get("ADMIN_USERNAME");
    const email = this.configService.get("ADMIN_EMAIL");
    const password = this.configService.get("ADMIN_PASSWORD");

    const isUserExists: boolean = await this.usersRepository.exists({
      where: { email },
    });

    if (!isUserExists) {
      this.createUser({
        username,
        email,
        password,
        role: UserRole.admin,
      });
    }
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.usersRepository.createQueryBuilder("users").getMany();
  }

  async getByEmail(
    email: string,
    relations: string[] = [],
  ): Promise<UserEntity> {
    const user: UserEntity | null = await this.usersRepository.findOne({
      where: { email },
      relations,
    });
    if (!user) {
      this.logger.error(`User with email ${email} not found.`);
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    return user;
  }

  async getById(id: number): Promise<UserEntity> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: { id },
      });
    } catch {
      this.logger.error(`User with id ${id} not found.`);
      throw new NotFoundException(`User with id ${id} not found.`);
    }
  }

  async me(id: number | undefined | null): Promise<UserEntity | null> {
    if (id === undefined || id === null) return null;

    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async createUser({
    username,
    email,
    password,
    role,
  }: CreateUserDto): Promise<UserEntity> {
    const hashedPassword: string = await bcryptHash(password, 10);

    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    user.role = role;
    user.slug = generateSlug(username);

    try {
      await user.save();
      this.logger.log(`User with email: ${user.email} was created`);
      return user;
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        const err = error as QueryFailedError & { code?: string };

        this.logger.error(`Error message: ${err.message}, code: ${err.code}`);

        if (err?.code === this.uniqueViolationCode) {
          throw new ConflictException(
            `User with email ${email} already exists`,
          );
        }
      }

      throw new InternalServerErrorException();
    }
  }
}
