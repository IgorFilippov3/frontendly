import { LessonEntity } from "../entities/lesson.entity";
import { TutorialEntity } from "../entities/tutorial.entity";

export interface TutorialData {
  tutorial: TutorialEntity;
  currentLesson: LessonEntity;
}
