import { JSONContent } from "@tiptap/core";

export type Thought = {
  id: string;
  title: string;
  body: JSONContent;
  date: Date;
  deleted: boolean;
  subtitle: string;
  group: string;
};

export type Group = {
  name: string;
};