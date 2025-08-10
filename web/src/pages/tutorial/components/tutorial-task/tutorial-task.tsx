import "./tutorial-task.css";

import { MarkdownRenderer } from "@/components/app/markdown-renderer/markdown-renderer";

interface TutorialTaskProps {
  markdown: string;
}

export const TutorialTask = ({ markdown }: TutorialTaskProps) => {
  return (
    <div className="tutorial-task">
      <MarkdownRenderer markdown={markdown} />
    </div>
  );
};
