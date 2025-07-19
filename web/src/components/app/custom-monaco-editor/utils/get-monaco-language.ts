export function getMonacoLanguage(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "html":
    case "htm":
      return "html";
    case "css":
      return "css";
    case "scss":
    case "sass":
      return "scss";
    case "less":
      return "less";
    case "js":
      return "javascript";
    case "jsx":
      return "javascriptreact";
    case "ts":
      return "typescript";
    case "tsx":
      return "typescriptreact";
    case "json":
      return "json";
    case "vue":
      return "html";
    case "md":
    case "markdown":
      return "markdown";
    default:
      return "plaintext";
  }
}
