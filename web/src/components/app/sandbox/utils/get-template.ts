import { TutorialContentType } from "@/types/tutorial/tutorial-content-type";
import { type SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";

export function getTemplate(
  contentType: TutorialContentType,
): SandpackPredefinedTemplate {
  switch (contentType) {
    case TutorialContentType.html:
    case TutorialContentType.css:
      return "static";
    case TutorialContentType.javascript:
      return "vanilla";
    case TutorialContentType.typescript:
      return "vanilla-ts";
    case TutorialContentType.reactjs:
      return "react";
    case TutorialContentType.reactts:
      return "react-ts";
    case TutorialContentType.angular:
      return "angular";
    default:
      throw new Error("Invalid tutorial content type");
  }
}
