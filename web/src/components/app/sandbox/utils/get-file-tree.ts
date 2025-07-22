import type { File } from "@/types/files/file";
import { TutorialContentType } from "@/types/tutorial/tutorial-content-type";
import { SOLIDJS_TEMPLATE } from "../constants/solidjs-template";

export function getFileTree(
  files: File[],
  contentType: TutorialContentType,
): Record<string, string> {
  const tree: Record<string, string> = transformFilesToFileTree(files);

  switch (contentType) {
    case TutorialContentType.solid:
      return {
        ...SOLIDJS_TEMPLATE,
        ...tree,
      };
    default:
      return tree;
  }
}

function transformFilesToFileTree(files: File[]): Record<string, string> {
  const tree: Record<string, string> = {};

  for (const file of files) {
    tree[file.path + file.name] = file.code || "";
  }

  return tree;
}
