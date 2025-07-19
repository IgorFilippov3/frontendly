import { createSlice } from "@reduxjs/toolkit";

interface TutorialsState {
  isTutorialTaskOpen: boolean;
}

const initialState: TutorialsState = {
  isTutorialTaskOpen: true,
};

const tutorialsSlice = createSlice({
  name: "tutorials-slice",
  initialState,
  reducers: {
    openTutorialTask(state: TutorialsState) {
      state.isTutorialTaskOpen = true;
    },
    closeTutorialTask(state: TutorialsState) {
      state.isTutorialTaskOpen = false;
    },
  },
});

export const { openTutorialTask, closeTutorialTask } = tutorialsSlice.actions;
export default tutorialsSlice.reducer;
