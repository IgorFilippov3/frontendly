import type { Lesson } from "@/types/lessons/lesson";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface NewLessonDto {
  name: string;
  tutorialId: number;
}

interface UpdateLessonDto {
  lessonId: number;
  taskMarkdown: string;
}

export const lessonsApi = createApi({
  reducerPath: "lessonsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/lessons",
  }),
  tagTypes: ["Lesson", "Tutorial"],
  endpoints: (builder) => ({
    getLessons: builder.query<Lesson[], void>({
      query: () => "",
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "Lesson" as const, id })),
              { type: "Lesson", id: "LIST" },
            ]
          : [{ type: "Lesson", id: "LIST" }];
      },
    }),
    getLesson: builder.query<Lesson, number>({
      query: (lessonId) => `/${lessonId}`,
      providesTags: (_result, _error, lessonId) => [
        { type: "Lesson", id: lessonId },
      ],
    }),
    getLessonByKey: builder.query<Lesson, string>({
      query: (lessonKey) => `/get-by-key/${lessonKey}`,
      providesTags: (result, _error, lessonKey) => [
        { type: "Lesson", id: lessonKey },
        ...(result ? [{ type: "Lesson" as const, id: result.id }] : []),
      ],
    }),
    createLesson: builder.mutation<Lesson, NewLessonDto>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { tutorialId }) => [
        { type: "Lesson", id: "LIST" },
        { type: "Tutorial", id: tutorialId },
      ],
    }),
    updateLesson: builder.mutation<Lesson, UpdateLessonDto>({
      query: ({ lessonId, taskMarkdown }) => ({
        url: `/${lessonId}`,
        method: "PATCH",
        body: { taskMarkdown },
      }),
      invalidatesTags: (_result, _error, { lessonId }) => [
        { type: "Lesson", id: lessonId },
      ],
    }),
    deleteLesson: builder.mutation<void, number>({
      query: (lessonId) => ({
        url: `/${lessonId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Lesson", id: "LIST" }],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useGetLessonQuery,
  useGetLessonByKeyQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonsApi;
