import { type File } from "@/types/files/file";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateFileDto {
  name: string;
  path: string;
  lessonId: number;
}

interface UpdateFileDto {
  fileId: number;
  name: string;
  path: string;
  code: string;
}

interface DeleteFileDto {
  fileId: number;
  lessonId: number;
}

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/files",
  }),
  tagTypes: ["File", "Lesson"],
  endpoints: (builder) => ({
    getFiles: builder.query<File[], void>({
      query: () => "",
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "File" as const, id })),
              { type: "File", id: "LIST" },
            ]
          : [{ type: "File", id: "LIST" }];
      },
    }),
    getFile: builder.query<File, number>({
      query: (fileId: number) => `/${fileId}`,
      providesTags: (_result, _error, fileId) => [{ type: "File", id: fileId }],
    }),
    createFile: builder.mutation<File, CreateFileDto>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { lessonId }) => [
        { type: "File", id: "LIST" },
        { type: "Lesson", id: lessonId },
        "Lesson",
      ],
    }),
    updateFile: builder.mutation<File, UpdateFileDto>({
      query: ({ fileId, ...body }) => ({
        url: `/${fileId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { fileId }) => [
        { type: "File", id: fileId },
      ],
    }),
    deleteFile: builder.mutation<void, DeleteFileDto>({
      query: ({ fileId }) => ({
        url: `/${fileId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFileQuery,
  useUpdateFileMutation,
  useDeleteFileMutation,
  useCreateFileMutation,
} = filesApi;
