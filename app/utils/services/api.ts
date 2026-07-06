import { JSONContent } from "@tiptap/core";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5144/api";

export const loginUser = async (username: string, password: string) => {
  const res = await axios.post(
    `${API_BASE}/auth/login`,
    { username, password },
    { withCredentials: true },
  );
  return res.data;
};

export const me = async () => {
  const res = await axios.get(`${API_BASE}/secure/me`, {
    withCredentials: true,
  });

  return res.data;
};

export const createWord = async (
  title: string,
  body: JSONContent,
  date: Date,
  subtitle: string,
  group: string,
) => {
  const res = await axios.post(
    `${API_BASE}/words/create`,
    { title, body, date, subtitle, group },
    { withCredentials: true },
  );
  return res.data; // returns success message
};

export const readAll = async () => {
  const res = await axios.get(`${API_BASE}/words/readall`, {
    withCredentials: true,
  });

  return res.data; // returns list of words
};

export const getAllGroups = async () => {
  const res = await axios.get(`${API_BASE}/groups`, {
    withCredentials: true,
  });

  return res.data;
};

export async function getThought(id: string) {
  const res = await axios.get(`${API_BASE}/words/${id}`, {
    withCredentials: true,
    headers: { "Cache-Control": "no-cache" },
  });

  if (!res.data) {
    throw new Error("Thought not found");
  }

  return res.data;
}

export const updateWord = async (
  id: string,
  title: string,
  body: JSONContent,
  date: Date,
  subtitle: string,
  group: string,
) => {
  const res = await axios.post(
    `${API_BASE}/words/update`,
    { id, title, body, date, subtitle, group },
    { withCredentials: true },
  );
  return res.data;
};