import type { Lesson } from "../lessons/lesson";
import type { Tutorial } from "./tutorial";

export interface TutorialData {
  tutorial: Tutorial;
  currentLesson: Lesson;
}
