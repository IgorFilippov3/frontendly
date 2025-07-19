import { LessonEntity } from "src/_core/entities/lesson.entity";
import { TutorialContentType } from "src/_core/models/tutorial-content-type";
import { TutorialDifficultyLevel } from "src/_core/models/tutorial-difficulty-level";

export interface TutorialDto {
  id: number;
  name: string;
  description: string;
  key: string;
  contentType: TutorialContentType;
  difficulty: TutorialDifficultyLevel;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner?: {
    username: string;
    key: string;
  };
  lessons?: LessonEntity[];
}
