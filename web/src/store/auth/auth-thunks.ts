import api from "@/api/axiosInstance";
import { type User } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoginDto {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<void, LoginDto>(
  "auth/loginUser",
  async (dto) => {
    await api.post("/auth/login", dto);
  },
);

interface SignupDto {
  username: string;
  email: string;
  password: string;
}

export const signupUser = createAsyncThunk<void, SignupDto>(
  "auth/signupUser",
  async (dto) => {
    await api.post("/auth/signup", dto);
  },
);

export const fetchUser = createAsyncThunk<{ user: User | null }>(
  "auth/fetchUser",
  async () => {
    const response = await api.get<{ user: User | null }>("/auth/me");
    return response.data;
  },
);

export const logoutUser = createAsyncThunk<void, void>("auth/logoutUser", () =>
  api.post("/auth/logout"),
);
