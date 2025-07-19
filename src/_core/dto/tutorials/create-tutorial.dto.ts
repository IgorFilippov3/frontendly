import { TutorialContentType } from "src/_core/models/tutorial-content-type";
import { TutorialDifficultyLevel } from "src/_core/models/tutorial-difficulty-level";

export class CreateTutorialDto {
  name: string;
  description: string;
  contentType: TutorialContentType;
  difficulty: TutorialDifficultyLevel;
  author: string;
}
