import type { CollectionType } from "../collection-type";

export enum TutorialDifficultyLevel {
  beginner = "beginner",
  intermediate = "intermediate",
  expert = "expert",
}

export type TutorialDifficultyLevelItem =
  CollectionType<TutorialDifficultyLevel>;

export const tutorialDifficultyLevelItems: TutorialDifficultyLevelItem[] = [
  { value: TutorialDifficultyLevel.beginner, displayName: "Beginner" },
  { value: TutorialDifficultyLevel.intermediate, displayName: "Intermediate" },
  { value: TutorialDifficultyLevel.expert, displayName: "Expert" },
];

export function getTutorialDifficultyLevelItems(): TutorialDifficultyLevelItem[] {
  return tutorialDifficultyLevelItems;
}

export function getDifficultyColor(
  difficulty: TutorialDifficultyLevel,
): string {
  switch (difficulty) {
    case TutorialDifficultyLevel.beginner:
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case TutorialDifficultyLevel.intermediate:
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case TutorialDifficultyLevel.expert:
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
}
