import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";
import { fetchUser, loginUser, logoutUser, signupUser } from "./auth-thunks";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<{ user: User | null }>) => {
          state.user = action.payload.user;
        },
      )
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(loginUser.fulfilled, () => {
        window.location.reload();
      })
      .addCase(logoutUser.fulfilled, () => {
        window.location.reload();
      })
      .addCase(signupUser.fulfilled, () => {
        window.location.href = "/me";
      });
  },
});

export default authSlice.reducer;
