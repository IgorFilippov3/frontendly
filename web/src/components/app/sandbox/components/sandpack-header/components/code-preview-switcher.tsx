import clsx from "clsx";
import styles from "./code-preview-switcher.module.css";
import {
  getTutorialActivePanelItems,
  TutorialActivePanel,
  type TutorialActivePanelItem,
} from "@/types/tutorial/tutorial-active-panel";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useCallback, useMemo } from "react";
import { setTutorialActivePanel } from "@/store/tutorials/tutorials-slice";

export const CodePreviewSwitcher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tutorialActivePanel } = useSelector(
    (state: RootState) => state.tutorials,
  );

  const changeTutorialActivePanel = useCallback(
    (value: TutorialActivePanel) => {
      dispatch(setTutorialActivePanel(value));
    },
    [dispatch],
  );

  const tabs = useMemo(() => {
    const items: TutorialActivePanelItem[] = getTutorialActivePanelItems();

    return items.map((item) => (
      <button
        key={item.value}
        onClick={() => changeTutorialActivePanel(item.value)}
        className={clsx(
          styles.codePreviewSwitcherButton,
          tutorialActivePanel === item.value ? styles.active : styles.inactive,
        )}
      >
        {item.displayName}
      </button>
    ));
  }, [tutorialActivePanel, changeTutorialActivePanel]);

  return <div className={styles.codePreviewSwitcher}>{tabs}</div>;
};
