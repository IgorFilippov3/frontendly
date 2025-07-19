import type { File } from "@/types/files/file";

export function getFileTree(files: File[]): Record<string, string> {
  const tree: Record<string, string> = {};

  for (const file of files) {
    tree[file.path + file.name] = file.code || "";
  }

  return tree;
}
