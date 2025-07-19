import type { editor } from "monaco-editor";

export const monacoDefaultOptions: editor.IStandaloneEditorConstructionOptions =
  {
    fontFamily:
      '"Fira Code", "JetBrains Mono", "SF Mono", Monaco, Menlo, "Ubuntu Mono", monospace',
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    fontLigatures: true, // если используете Fira Code
    renderWhitespace: "selection",
    smoothScrolling: true,
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: "off",
    minimap: {
      enabled: false,
    },
    tabSize: 2,
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: "on",
    tabCompletion: "on",
    parameterHints: {
      enabled: true,
    },
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true,
    },
  };
