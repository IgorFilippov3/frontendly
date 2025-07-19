import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

export const MarkdownRenderer = ({
  markdown,
  className,
}: MarkdownRendererProps) => {
  return (
    <div className={className}>
      <MDEditor.Markdown source={markdown} />
    </div>
  );
};
