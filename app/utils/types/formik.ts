import { JSONContent } from "@tiptap/core";

interface AuthFormValues {
  username: string;
  password: string;
}

export type LoginFormInitialValues = AuthFormValues

export interface AddThoughtFormValues {
  title: string;
  body: JSONContent;
  date: Date;
  deleted: boolean;
  subtitle: string;
  group: string;
}
