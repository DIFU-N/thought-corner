import { createSlice } from "@reduxjs/toolkit";
import { createThought, readThoughts, updateThought } from "../thunks/thoughtThunks";
import { Thought } from "@/app/utils/types/thoughts";

type initialState = {
  thought: Thought | null;
  thoughts: Thought[];
  loading: boolean;
  error: string | null;
};

const initialState: initialState = {
  thought: null,
  thoughts: [],
  loading: true,
  error: null,
};

const thoughtSlice = createSlice({
  name: "thought",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // create THoughts
      .addCase(createThought.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createThought.fulfilled, (state, action) => {
        state.loading = false;
        state.thought = action.payload;
      })
      .addCase(createThought.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "creation failed";
      })

      // read All Thoughts
      .addCase(readThoughts.pending, (state) => {
        state.loading = true;
      })
      .addCase(readThoughts.fulfilled, (state, action) => {
        state.thoughts = [...action.payload];
        state.loading = false;
      })
      .addCase(readThoughts.rejected, (state, action) => {
        state.error = action.error.message || "readation failed";
        console.log();
        
        state.loading = false;
      })

      // update THoughts
      .addCase(updateThought.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateThought.fulfilled, (state, action) => {
        state.loading = false;
        state.thought = action.payload;
      })
      .addCase(updateThought.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "updation failed";
      });
  },
});

export const {} = thoughtSlice.actions;
export default thoughtSlice.reducer;
