import api from "@/api/axiosInstance";
import type { Lesson } from "@/types/lessons/lesson";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface NewLessonDto {
  name: string;
  tutorialId: number;
}

export const newLesson = createAsyncThunk<Lesson, NewLessonDto>(
  "lessons/newLesson",
  async (dto) => {
    const response = await api.post("/lessons", dto);
    return response.data;
  },
);

export const fetchLessons = createAsyncThunk<Lesson[]>(
  "lessons/fetchLessons",
  async () => {
    const response = await api.get("/lessons");
    return response.data;
  },
);

export const fetchLesson = createAsyncThunk<Lesson, number>(
  "lessons/fetchLesson",
  async (lessonId: number) => {
    const response = await api.get(`/lessons/${lessonId}`);
    return response.data;
  },
);

export const fetchLessonByKey = createAsyncThunk<Lesson, string>(
  "lessons/fetchLessonByKey",
  async (lessonKey: string) => {
    const response = await api.get(`/lessons/get-by-key/${lessonKey}`);
    return response.data;
  },
);

interface UpdateLessonParams {
  lessonId: number;
  taskMarkdown: string;
}

export const updateLesson = createAsyncThunk<Lesson, UpdateLessonParams>(
  "lessons/updateLesson",
  async ({ lessonId, taskMarkdown }: UpdateLessonParams) => {
    const response = await api.patch(`/lessons/${lessonId}`, { taskMarkdown });
    return response.data;
  },
);
