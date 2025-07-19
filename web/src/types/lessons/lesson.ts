import type { File } from "../files/file";

export interface Lesson {
  id: number;
  name: string;
  key: string;
  order: number;
  taskHtml: string;
  taskMarkdown: string;
  files: File[];
}
