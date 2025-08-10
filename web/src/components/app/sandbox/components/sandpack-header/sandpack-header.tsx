import { PanelLeft, PanelRight } from "lucide-react";
import { CodePreviewSwitcher } from "./components/code-preview-switcher";
import styles from "./sandpack-header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store";
import { TutorialTaskPosition } from "@/types/tutorial/tutorial-task-position";
import { setTutorialTaskPosition } from "@/store/tutorials/tutorials-slice";

const ICON_SIZE = 26;

export const SandpackHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tutorialTaskPosition } = useSelector(
    (state: RootState) => state.tutorials,
  );

  const isTaskOnLeft: boolean =
    tutorialTaskPosition === TutorialTaskPosition.left;

  const toggleTaskPosition = () => {
    const newPosition: TutorialTaskPosition = isTaskOnLeft
      ? TutorialTaskPosition.right
      : TutorialTaskPosition.left;
    dispatch(setTutorialTaskPosition(newPosition));
  };

  return (
    <div className={styles.sandpackHeader}>
      <div className={styles.sandpackHeaderSpacer}>
        <button
          className="text-gray-500 hover:text-white transition-colors duration-200 cursor-pointer"
          onClick={toggleTaskPosition}
          type="button"
        >
          {isTaskOnLeft ? (
            <PanelRight size={ICON_SIZE} />
          ) : (
            <PanelLeft size={ICON_SIZE} />
          )}
        </button>
      </div>
      <CodePreviewSwitcher />
    </div>
  );
};
