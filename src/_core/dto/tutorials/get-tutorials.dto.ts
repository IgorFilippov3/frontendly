import { UserEntity } from "src/_core/entities/user.entity";
import { TutorialContentType } from "src/_core/models/tutorial-content-type";
import { TutorialDifficultyLevel } from "src/_core/models/tutorial-difficulty-level";

export interface GetTutorialsDto {
  page?: number;
  limit?: number;
  published?: boolean;
  includeOwner?: boolean;
  contentType?: TutorialContentType;
  difficulty?: TutorialDifficultyLevel;
  user?: UserEntity;
}
