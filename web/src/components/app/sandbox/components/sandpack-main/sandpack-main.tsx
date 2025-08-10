import type { RootState } from "@/store";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import {
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { abbreviationTracker } from "@emmetio/codemirror6-plugin";
import { useSelector } from "react-redux";
import { SandpackConsole } from "../sandpack-console/sandpack-console";
import { useMemo } from "react";
import styles from "./sandpack-main.module.css";
import clsx from "clsx";
import { TutorialActivePanel } from "@/types/tutorial/tutorial-active-panel";

export const SandpackMain = () => {
  const { tutorialActivePanel } = useSelector(
    (state: RootState) => state.tutorials,
  );

  const codeEditor = useMemo(() => {
    return (
      <SandpackCodeEditor
        wrapContent
        extensions={[autocompletion(), abbreviationTracker()]}
        extensionsKeymap={[completionKeymap] as never}
        showTabs={true}
        closableTabs={true}
        showLineNumbers={true}
        className={clsx(
          styles.editor,
          tutorialActivePanel !== TutorialActivePanel.code && styles.hidden,
        )}
      />
    );
  }, [tutorialActivePanel]);

  const preview = useMemo(() => {
    return (
      <SandpackPreview
        showNavigator={true}
        showOpenInCodeSandbox={false}
        className={clsx(
          styles.preview,
          tutorialActivePanel !== TutorialActivePanel.preview && styles.hidden,
        )}
      >
        <SandpackConsole />
      </SandpackPreview>
    );
  }, [tutorialActivePanel]);

  return (
    <>
      {codeEditor}
      {preview}
    </>
  );
};
