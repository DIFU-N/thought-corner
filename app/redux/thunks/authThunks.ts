import { loginUser, me } from "@/app/utils/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    const data = await loginUser(username, password);
    return data;
  },
);

export const checkAuth = createAsyncThunk("auth/check", async () => {
  await me();
  return true;
});
