import { configureStore } from "@reduxjs/toolkit";

import { filesApi } from "./files/files-api";

import authReducer from "./auth/auth-slice";
import tutorialsReducer from "./tutorials/tutorials-slice";
import { tutorialsApi } from "./tutorials/tutorials-api";
import { lessonsApi } from "./lessons/lessons-api";

export const store = configureStore({
  reducer: {
    [tutorialsApi.reducerPath]: tutorialsApi.reducer,
    [lessonsApi.reducerPath]: lessonsApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,

    tutorials: tutorialsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      tutorialsApi.middleware,
      lessonsApi.middleware,
      filesApi.middleware,
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
