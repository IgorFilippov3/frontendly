import { TutorialActivePanel } from "@/types/tutorial/tutorial-active-panel";
import { TutorialTaskPosition } from "@/types/tutorial/tutorial-task-position";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TutorialsState {
  tutorialTaskPosition: TutorialTaskPosition;
  tutorialActivePanel: TutorialActivePanel;
}

const initialState: TutorialsState = {
  tutorialTaskPosition: TutorialTaskPosition.left,
  tutorialActivePanel: TutorialActivePanel.code,
};

const tutorialsSlice = createSlice({
  name: "tutorials-slice",
  initialState,
  reducers: {
    setTutorialTaskPosition(
      state: TutorialsState,
      action: PayloadAction<TutorialTaskPosition>,
    ) {
      state.tutorialTaskPosition = action.payload;
    },
    setTutorialActivePanel(
      state: TutorialsState,
      action: PayloadAction<TutorialActivePanel>,
    ) {
      state.tutorialActivePanel = action.payload;
    },
  },
});

export const { setTutorialActivePanel, setTutorialTaskPosition } =
  tutorialsSlice.actions;
export default tutorialsSlice.reducer;
