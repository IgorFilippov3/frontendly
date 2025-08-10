import type { CollectionType } from "../collection-type";

export enum TutorialActivePanel {
  code = "code",
  preview = "preview",
}

export type TutorialActivePanelItem = CollectionType<TutorialActivePanel>;

const tutorialActivePanelItems: TutorialActivePanelItem[] = [
  { value: TutorialActivePanel.code, displayName: "Code" },
  { value: TutorialActivePanel.preview, displayName: "Preview" },
];

export function getTutorialActivePanelItems(): TutorialActivePanelItem[] {
  return tutorialActivePanelItems;
}
