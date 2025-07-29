import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Patch,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { CreateTutorialDto } from "src/_core/dto/tutorials/create-tutorial.dto";
import { TutorialDto } from "src/_core/dto/tutorials/tutorial.dto";
import { UpdateTutorialDto } from "src/_core/dto/tutorials/update-tutorial.dto";
import { PaginatedResult } from "src/_core/dto/users/paginated-result.dto";
import { LessonEntity } from "src/_core/entities/lesson.entity";
import { TutorialEntity } from "src/_core/entities/tutorial.entity";
import { UserEntity } from "src/_core/entities/user.entity";
import { TutorialContentType } from "src/_core/models/tutorial-content-type";
import { TutorialData } from "src/_core/models/tutorial-data";
import { TutorialDifficultyLevel } from "src/_core/models/tutorial-difficulty-level";
import { LessonsService } from "src/_core/services/lessons.service";
import { TutorialsService } from "src/_core/services/tutorials.service";
import { UsersService } from "src/_core/services/users.service";
import { findObjectWithMinOrder } from "src/_core/utils/findObjectWithMinOrder";
import { GetUserId } from "src/_core/utils/get-user-id";

@Controller("tutorials")
export class TutorialsController {
  constructor(
    private tutorialService: TutorialsService,
    private lessonsService: LessonsService,
    private usersService: UsersService,
  ) {}

  @Get()
  findAll(
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
    @Query("contentType") contentType?: TutorialContentType,
    @Query("difficulty") difficulty?: TutorialDifficultyLevel,
  ): Promise<PaginatedResult<TutorialDto>> {
    return this.tutorialService.findAll({
      page,
      limit,
      published: true,
      includeOwner: true,
      contentType,
      difficulty,
    });
  }

  @Get("admin/all")
  async findAllForAdmin(
    @GetUserId() userId: number,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
    @Query("contentType") contentType?: TutorialContentType,
    @Query("difficulty") difficulty?: TutorialDifficultyLevel,
  ): Promise<PaginatedResult<TutorialDto>> {
    const user: UserEntity = await this.usersService.getById(userId);

    return this.tutorialService.findAll({
      user,
      page,
      limit,
      published: undefined,
      includeOwner: false,
      contentType,
      difficulty,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<TutorialEntity> {
    return this.tutorialService.findOne(+id);
  }

  @Get("get-by-key/:key")
  findOneByKey(@Param("key") key: string): Promise<TutorialEntity> {
    return this.tutorialService.findByKey(key, ["lessons"]);
  }

  @Get("tutorial-data/:tutorialKey/:lessonKey")
  async findTutorialData(
    @Param("tutorialKey") tutorialKey: string,
    @Param("lessonKey") lessonKey: string,
  ): Promise<TutorialData> {
    const tutorial: TutorialEntity = await this.tutorialService.findByKey(
      tutorialKey,
      ["lessons"],
    );

    const currentLesson =
      lessonKey === "__first_lesson_key__"
        ? findObjectWithMinOrder(tutorial.lessons)
        : tutorial.lessons.find((l: LessonEntity) => l.key === lessonKey);

    if (!currentLesson) {
      throw new NotFoundException(`Lesson with key ${lessonKey} not found`);
    }

    const lesson: LessonEntity = await this.lessonsService.findById(
      currentLesson.id,
      ["files"],
    );

    return {
      tutorial,
      currentLesson: lesson,
    };
  }

  @Post()
  async create(
    @GetUserId() userId: number,
    @Body() dto: CreateTutorialDto,
  ): Promise<TutorialEntity> {
    const user: UserEntity = await this.usersService.getById(userId);
    return this.tutorialService.create(dto, user);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateTutorialDto,
  ): Promise<TutorialEntity> {
    return this.tutorialService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.tutorialService.remove(+id);
  }
}
