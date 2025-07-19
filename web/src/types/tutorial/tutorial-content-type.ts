import type { CollectionType } from "../collection-type";

export enum TutorialContentType {
  html = "html",
  css = "css",
  javascript = "javascript",
  typescript = "typescript",
  reactjs = "reactjs",
  reactts = "reactts",
  angular = "angular",
}

export type TutorialContentTypeItem = CollectionType<TutorialContentType>;

export const tutorialContentTypeItems: TutorialContentTypeItem[] = [
  { value: TutorialContentType.html, displayName: "HTML" },
  { value: TutorialContentType.css, displayName: "CSS" },
  { value: TutorialContentType.javascript, displayName: "Javascript" },
  { value: TutorialContentType.typescript, displayName: "Typescript" },
  { value: TutorialContentType.reactjs, displayName: "React Javascript" },
  { value: TutorialContentType.reactts, displayName: "React Typescript" },
  { value: TutorialContentType.angular, displayName: "Angular" },
];

export function getTutorialContentTypeItems(): TutorialContentTypeItem[] {
  return tutorialContentTypeItems;
}
