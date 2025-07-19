import "./sandbox.css";

import type { File } from "@/types/files/file";
import type { TutorialContentType } from "@/types/tutorial/tutorial-content-type";

import { atomDark } from "@codesandbox/sandpack-themes";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { abbreviationTracker } from "@emmetio/codemirror6-plugin";
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { getFileTree } from "./utils/get-file-tree";
import { getTemplate } from "./utils/get-template";
import { useMemo } from "react";
import { SandpackConsole } from "./components/sandpack-console";

interface SandboxProps {
  contentType: TutorialContentType;
  files: File[] | undefined;
}

export const Sandbox = ({ files, contentType }: SandboxProps) => {
  // This is necessary to prevent the preview from caching the old build
  const filesKey = useMemo(() => {
    return btoa(JSON.stringify(files)).slice(0, 10);
  }, [files]);

  if (!files) return null;

  return (
    <SandpackProvider
      key={filesKey}
      files={getFileTree(files)}
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
        <SandpackFileExplorer />
        <SandpackCodeEditor
          wrapContent
          extensions={[autocompletion(), abbreviationTracker()]}
          extensionsKeymap={[completionKeymap] as never}
          showTabs={true}
          closableTabs={true}
          showLineNumbers={true}
          className="custom-code-editor"
        />
        <SandpackPreview
          style={{ height: "100%" }}
          showNavigator={true}
          showOpenInCodeSandbox={false}
        >
          {/* <SandpackConsole actionsChildren={[<Button>Open/Close1</Button>]} /> */}
          <SandpackConsole />
        </SandpackPreview>
      </SandpackLayout>
    </SandpackProvider>
  );
};
