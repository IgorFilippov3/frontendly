import type { Lesson } from "@/types/lessons/lesson";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchLesson,
  fetchLessons,
  newLesson,
  updateLesson,
} from "./lessons-thunks";

interface LessonsState {
  lessons: Lesson[] | null;
  lesson: Lesson | null;
}

const initialState: LessonsState = {
  lessons: null,
  lesson: null,
};

const lessonsSlice = createSlice({
  name: "lessons-slice",
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    return bulder
      .addCase(
        newLesson.fulfilled,
        (state: LessonsState, { payload }: PayloadAction<Lesson>) => {
          state.lessons = Array.isArray(state.lessons)
            ? [...state.lessons, payload]
            : [payload];
        },
      )
      .addCase(
        fetchLessons.fulfilled,
        (state: LessonsState, { payload }: PayloadAction<Lesson[]>) => {
          state.lessons = payload;
        },
      )

      .addCase(
        fetchLesson.fulfilled,
        (state: LessonsState, { payload }: PayloadAction<Lesson>) => {
          state.lesson = payload;
        },
      )

      .addCase(
        updateLesson.fulfilled,
        (state: LessonsState, { payload }: PayloadAction<Lesson>) => {
          state.lesson = payload;
        },
      );
  },
});

export default lessonsSlice.reducer;
