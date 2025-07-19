import { TutorialDifficultyLevel } from "src/_core/models/tutorial-difficulty-level";

export class UpdateTutorialDto {
  name?: string;
  type?: string;
  published?: boolean;
  description?: string;
  difficulty?: TutorialDifficultyLevel;
}
