import type { Lesson } from "../lessons/lesson";
import type { TutorialContentType } from "./tutorial-content-type";
import type { TutorialDifficultyLevel } from "./tutorial-difficulty-level";

export interface Tutorial {
  id: number;
  name: string;
  description: string;
  key: string;
  contentType: TutorialContentType;
  difficulty: TutorialDifficultyLevel;
  author: string;
  published: boolean;
  lessons: Lesson[];
  owner?: {
    username: string;
    key: string;
  };
}
