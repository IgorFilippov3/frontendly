import "./sandbox.css";

import type { File } from "@/types/files/file";
import { TutorialContentType } from "@/types/tutorial/tutorial-content-type";

import { atomDark } from "@codesandbox/sandpack-themes";
import {
  SandpackFileExplorer,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { getFileTree } from "./utils/get-file-tree";
import { getTemplate } from "./utils/get-template";
import { SandpackHeader } from "./components/sandpack-header/sandpack-header";
import { SandpackMain } from "./components/sandpack-main/sandpack-main";
import { memo } from "react";

interface SandboxProps {
  contentType: TutorialContentType;
  files: File[] | undefined;
}

export const Sandbox = memo(({ files, contentType }: SandboxProps) => {
  if (!files) return null;

  return (
    <SandpackProvider
      files={getFileTree(files, contentType)}
      template={getTemplate(contentType)}
      theme={atomDark}
      options={{
        recompileMode: "delayed",
        recompileDelay: 600,
        classes: {
          "sp-wrapper": "custom-wrapper",
          "sp-layout": "custom-layout",
          "sp-tab-button": "custom-tab",
          "sp-tabs": "custom-tabs",
          "sp-navigator": "custom-navigator",
          "sp-console": "custom-console",
          "sp-file-explorer": "custom-file-explorer",
        },
      }}
    >
      <SandpackLayout>
        <SandpackHeader />
        <SandpackFileExplorer />
        <SandpackMain />
      </SandpackLayout>
    </SandpackProvider>
  );
});
