import type { PaginatedResult } from "@/types/paginated-result";
import type { Tutorial } from "@/types/tutorial/tutorial";
import type { TutorialContentType } from "@/types/tutorial/tutorial-content-type";
import type { TutorialData } from "@/types/tutorial/tutorial-data";
import type { TutorialDifficultyLevel } from "@/types/tutorial/tutorial-difficulty-level";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetTutorialsDto {
  contentType?: TutorialContentType;
  difficulty?: TutorialDifficultyLevel;
}

interface GetTutorialDataDto {
  tutorialKey: string;
  lessonKey: string;
}

interface NewTutorialDto {
  name: string;
  description: string;
  contentType: TutorialContentType;
  difficulty: TutorialDifficultyLevel;
}

export const tutorialsApi = createApi({
  reducerPath: "tutorialsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/tutorials",
  }),
  tagTypes: ["Tutorial", "Lesson", "TutorialData"],
  endpoints: (builder) => ({
    getTutorials: builder.query<PaginatedResult<Tutorial>, GetTutorialsDto>({
      query: ({ contentType, difficulty }) => {
        const params = new URLSearchParams();
        if (contentType) params.append("contentType", contentType);
        if (difficulty) params.append("difficulty", difficulty);

        return `/?${params.toString()}`;
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Tutorial" as const,
                id,
              })),
              { type: "Tutorial", id: "LIST" },
            ]
          : [{ type: "Tutorial", id: "LIST" }];
      },
    }),

    getAllTutorials: builder.query<PaginatedResult<Tutorial>, void>({
      query: () => "/admin/all",
      providesTags: (result) => {
        return result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Tutorial" as const,
                id,
              })),
              { type: "Tutorial", id: "LIST" },
            ]
          : [{ type: "Tutorial", id: "LIST" }];
      },
    }),

    getTutorialData: builder.query<TutorialData, GetTutorialDataDto>({
      query: ({ tutorialKey, lessonKey }) => {
        return lessonKey
          ? `/tutorial-data/${tutorialKey}/${lessonKey}`
          : `/tutorial-data/${tutorialKey}/__first_lesson_key__`;
      },
      providesTags: (_result, _error, { tutorialKey, lessonKey }) => [
        { type: "TutorialData", id: `${tutorialKey}-${lessonKey}` },
        { type: "Tutorial", id: tutorialKey },
        { type: "Lesson", id: lessonKey },
      ],
    }),
    getTutorialByKey: builder.query<Tutorial, string>({
      query: (tutorialKey) => `/get-by-key/${tutorialKey}`,
      providesTags: (_result, _error, tutorialKey) => [
        { type: "Tutorial", id: tutorialKey },
      ],
    }),
    getTutorialById: builder.query<Tutorial, number>({
      query: (tutorialId) => `/${tutorialId}`,
      providesTags: (_result, _error, tutorialId) => [
        { type: "Tutorial", id: tutorialId },
      ],
    }),
    createTutorial: builder.mutation<Tutorial, NewTutorialDto>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tutorial", id: "LIST" }],
    }),
    deleteTutorial: builder.mutation<void, number>({
      query: (tutorialId) => ({
        url: `/${tutorialId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, tutorialId) => [
        { type: "Tutorial", id: tutorialId },
        { type: "Tutorial", id: "LIST" },
      ],
    }),
    publishTutorial: builder.mutation<void, number>({
      query: (tutorialId) => ({
        url: `/${tutorialId}`,
        method: "PATCH",
        body: { published: true },
      }),
      invalidatesTags: (_result, _error, tutorialId) => [
        { type: "Tutorial", id: tutorialId },
        { type: "Tutorial", id: "LIST" },
      ],
    }),
    unpublishTutorial: builder.mutation<void, number>({
      query: (tutorialId) => ({
        url: `/${tutorialId}`,
        method: "PATCH",
        body: { published: false },
      }),
      invalidatesTags: (_result, _error, tutorialId) => [
        { type: "Tutorial", id: tutorialId },
        { type: "Tutorial", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllTutorialsQuery,
  useGetTutorialsQuery,
  useGetTutorialDataQuery,
  useGetTutorialByKeyQuery,
  useGetTutorialByIdQuery,
  useCreateTutorialMutation,
  useDeleteTutorialMutation,
  usePublishTutorialMutation,
  useUnpublishTutorialMutation,
} = tutorialsApi;
