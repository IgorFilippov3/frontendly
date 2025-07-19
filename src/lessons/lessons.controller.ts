import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateLessonDto } from "src/lessons/dto/create-lesson.dto";
import { LessonEntity } from "src/_core/entities/lesson.entity";
import { LessonsService } from "src/_core/services/lessons.service";
import { TutorialsService } from "src/_core/services/tutorials.service";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { TutorialEntity } from "src/_core/entities/tutorial.entity";

@Controller("lessons")
export class LessonsController {
  constructor(
    private lessonService: LessonsService,
    private tutorialService: TutorialsService,
  ) {}

  @Post()
  async create(
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<LessonEntity> {
    const tutorial = await this.tutorialService.findById(
      createLessonDto.tutorialId,
    );

    return await this.lessonService.create(createLessonDto, tutorial);
  }

  @Get()
  async findAll(
    @Query("tutorialId") tutorialId?: number,
  ): Promise<LessonEntity[]> {
    if (tutorialId) {
      return await this.lessonService.findByTutorialId(tutorialId);
    }
    return await this.lessonService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<LessonEntity> {
    return this.lessonService.findById(+id, ["files"]);
  }

  @Get("get-by-key/:tutorialKey/:lessonKey")
  async findOneByKey(
    @Param("tutorialKey") tutorialKey: string,
    @Param("lessonKey") lessonKey: string,
  ): Promise<LessonEntity> {
    const lessonOwner: TutorialEntity =
      await this.tutorialService.findByKey(tutorialKey);
    return this.lessonService.findByKey(lessonKey, lessonOwner.id, ["files"]);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<LessonEntity> {
    return this.lessonService.update(+id, updateLessonDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string): Promise<void> {
    return this.lessonService.remove(+id);
  }
}
