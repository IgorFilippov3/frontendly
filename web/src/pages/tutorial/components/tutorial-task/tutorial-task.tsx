import "./tutorial-task.css";

import { MarkdownRenderer } from "@/components/app/markdown-renderer/markdown-renderer";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

interface TutorialTaskProps {
  markdown: string;
}

export const TutorialTask = ({ markdown }: TutorialTaskProps) => {
  const { isTutorialTaskOpen } = useSelector(
    (state: RootState) => state.tutorials,
  );

  return (
    <div
      className={isTutorialTaskOpen ? "tutorial-task" : "tutorial-task hidden"}
    >
      <MarkdownRenderer markdown={markdown} />
    </div>
  );
};
