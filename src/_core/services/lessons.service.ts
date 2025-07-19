import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonEntity } from "../entities/lesson.entity";
import { Repository } from "typeorm";
import { TutorialEntity } from "../entities/tutorial.entity";
import { CreateLessonDto } from "src/lessons/dto/create-lesson.dto";
import { UpdateLessonDto } from "src/lessons/dto/update-lesson.dto";
import { generateSlug } from "../utils/generate-slug";

@Injectable()
export class LessonsService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
  ) {}

  async create(
    createLessonDto: CreateLessonDto,
    tutorial: TutorialEntity,
  ): Promise<LessonEntity> {
    const nextOrder = await this.getNextOrder(createLessonDto.tutorialId);

    const lesson = this.lessonRepository.create({
      ...createLessonDto,
      key: generateSlug(createLessonDto.name, false),
      order: nextOrder,
      tutorial,
    });

    return await this.lessonRepository.save(lesson);
  }

  async findAll(): Promise<LessonEntity[]> {
    return await this.lessonRepository.find({
      relations: ["files"],
      order: { order: "ASC" },
    });
  }

  async findById(id: number, relations: string[] = []): Promise<LessonEntity> {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations,
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return lesson;
  }

  async findByKey(
    key: string,
    tutorialId: number,
    relations: string[] = [],
  ): Promise<LessonEntity> {
    try {
      return await this.lessonRepository.findOneOrFail({
        where: { key, tutorialId },
        relations,
      });
    } catch {
      const error = `Lesson with key ${key} not found`;
      this.logger.error(error);
      throw new NotFoundException(error);
    }
  }

  async findByTutorialId(
    tutorialId: number,
    relations: string[] = [],
  ): Promise<LessonEntity[]> {
    return await this.lessonRepository.find({
      where: { tutorialId },
      relations,
      order: { order: "ASC" },
    });
  }

  async update(
    id: number,
    updateLessonDto: UpdateLessonDto,
  ): Promise<LessonEntity> {
    const lesson = await this.findById(id, ["files"]);

    Object.assign(lesson, updateLessonDto);

    return await this.lessonRepository.save(lesson);
  }

  async remove(id: number): Promise<void> {
    const lesson = await this.findById(id);
    await this.lessonRepository.remove(lesson);
  }

  async reorderLessons(
    tutorialId: number,
    lessonIds: number[],
  ): Promise<LessonEntity[]> {
    const lessons = await this.findByTutorialId(tutorialId);

    const updatedLessons: LessonEntity[] = [];

    for (let i = 0; i < lessonIds.length; i++) {
      const lesson = lessons.find((l) => l.id === lessonIds[i]);
      if (lesson) {
        lesson.order = i + 1;
        updatedLessons.push(await this.lessonRepository.save(lesson));
      }
    }

    return updatedLessons;
  }

  async getNextOrder(tutorialId: number): Promise<number> {
    const lastLesson = await this.lessonRepository.findOne({
      where: { tutorialId },
      order: { order: "DESC" },
    });

    return lastLesson ? lastLesson.order + 1 : 1;
  }
}
