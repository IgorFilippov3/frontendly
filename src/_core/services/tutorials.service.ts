import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TutorialEntity } from "../entities/tutorial.entity";
import { CreateTutorialDto } from "../dto/tutorials/create-tutorial.dto";
import { UpdateTutorialDto } from "../dto/tutorials/update-tutorial.dto";
import { UserEntity } from "../entities/user.entity";
import { generateSlug } from "../utils/generate-slug";
import { PaginatedResult } from "../dto/users/paginated-result.dto";
import { TutorialDto } from "../dto/tutorials/tutorial.dto";
import { GetTutorialsDto } from "../dto/tutorials/get-tutorials.dto";
import { UserRole } from "../models/user-role";

@Injectable()
export class TutorialsService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(TutorialEntity)
    private readonly tutorialRepository: Repository<TutorialEntity>,
  ) {}

  async findAll({
    user,
    page,
    limit,
    published,
    includeOwner,
    contentType,
    difficulty,
  }: GetTutorialsDto): Promise<PaginatedResult<TutorialDto>> {
    const queryBuilder =
      this.tutorialRepository.createQueryBuilder("tutorials");

    if (user && user.role !== UserRole.admin) {
      queryBuilder.where("tutorials.userId = :userId", { userId: user.id });
    }

    if (includeOwner) {
      queryBuilder.leftJoinAndSelect("tutorials.user", "user");
    }

    if (published !== undefined) {
      queryBuilder.where("tutorials.published = :published", { published });
    }

    if (contentType) {
      queryBuilder.andWhere("tutorials.contentType = :contentType", {
        contentType,
      });
    }

    if (difficulty) {
      queryBuilder.andWhere("tutorials.difficulty = :difficulty", {
        difficulty,
      });
    }

    if (page && limit) {
      const skip = (page - 1) * limit;
      queryBuilder.skip(skip).take(limit);
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    const transformedData: TutorialDto[] = data.map(
      (tutorial: TutorialEntity) => {
        const owner = tutorial.user
          ? { username: tutorial.user.username, key: tutorial.user.slug }
          : undefined;

        return {
          ...tutorial,
          owner,
        };
      },
    );

    return {
      data: transformedData,
      total,
      page: page || 1,
      limit: limit || total,
      totalPages: limit ? Math.ceil(total / limit) : 1,
    };
  }

  async findOne(id: number): Promise<TutorialEntity> {
    const tutorial = await this.tutorialRepository.findOne({
      where: { id },
      relations: ["lessons"],
    });
    if (!tutorial) throw new NotFoundException(`Tutorial ${id} not found`);
    return tutorial;
  }

  async findById(id: number): Promise<TutorialEntity> {
    try {
      return await this.tutorialRepository.findOneOrFail({
        where: { id },
      });
    } catch {
      const error = `Tutorial with id ${id} not found`;
      this.logger.error(error);
      throw new NotFoundException(error);
    }
  }

  async findByKey(
    key: string,
    relations: string[] = [],
  ): Promise<TutorialEntity> {
    try {
      return await this.tutorialRepository.findOneOrFail({
        where: { key },
        relations,
      });
    } catch {
      const error = `Tutorial with key ${key} not found`;
      this.logger.error(error);
      throw new NotFoundException(error);
    }
  }

  async create(
    dto: CreateTutorialDto,
    user: UserEntity,
  ): Promise<TutorialEntity> {
    const tutorial = this.tutorialRepository.create({
      ...dto,
      key: generateSlug(dto.name),
      user,
    });
    return this.tutorialRepository.save(tutorial);
  }

  async update(id: number, dto: UpdateTutorialDto): Promise<TutorialEntity> {
    const tutorial = await this.findOne(id);
    Object.assign(tutorial, dto);
    return this.tutorialRepository.save(tutorial);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tutorialRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tutorial ${id} not found`);
    }
  }
}
