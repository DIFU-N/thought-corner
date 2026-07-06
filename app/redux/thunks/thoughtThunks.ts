import { createWord, readAll, updateWord } from "@/app/utils/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { JSONContent } from "@tiptap/core";

export const createThought = createAsyncThunk(
  "thoughts/create",
  async ({
    title,
    body,
    date,
    subtitle,
    group,
  }: {
    title: string;
    body: JSONContent;
    date: Date;
    subtitle: string;
    group: string;
  }) => {
    const data = await createWord(title, body, date, subtitle, group);
    return data;
  },
);

export const readThoughts = createAsyncThunk("thought/readall", async () => {
  const data = await readAll();
  return data;
});


export const updateThought = createAsyncThunk(
  "thoughts/update",
  async ({
    id,
    title,
    body,
    date,
    subtitle,
    group,
  }: {
    id: string;
    title: string;
    body: JSONContent;
    date: Date;
    subtitle: string;
    group: string;
  }) => {
    const data = await updateWord(id, title, body, date, subtitle, group);
    return data;
  },
);