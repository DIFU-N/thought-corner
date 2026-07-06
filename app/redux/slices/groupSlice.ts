import { createSlice } from "@reduxjs/toolkit";
import { createThought, readThoughts } from "../thunks/thoughtThunks";
import { getGroups } from "../thunks/groupThunks";

type initialState = {
  groups: string[];
  loading: boolean;
  error: string | null;
};

const initialState: initialState = {
  groups: [],
  loading: false,
  error: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.groups = [...action.payload];
        state.loading = false;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.error = action.error.message || "readation failed";
        state.loading = false;
      });
  },
});

export const {} = groupSlice.actions;
export default groupSlice.reducer;
