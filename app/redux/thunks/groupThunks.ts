import { getAllGroups } from "@/app/utils/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getGroups = createAsyncThunk("thought/readall", async () => {
  const data = await getAllGroups();
  return data;
});
