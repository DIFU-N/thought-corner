"use client";
import React, { useEffect, useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import { getAllGroups } from "@/app/utils/services/api";
import { Group } from "@/app/utils/types/thoughts";

type Props = {
  name: string;
  placeholder?: string;
};

const GroupSelect: React.FC<Props> = ({
  name,
  placeholder = "Select or create group",
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<never>();

  const [groups, setGroups] = useState<Group[]>([]);
  const [query, setQuery] = useState(field.value ?? "");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // get new formik value after reinitialising
  useEffect(() => {
    setQuery(field.value);
  }, [field.value]);

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await getAllGroups();
      setGroups(data);
    };
    fetchGroups();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setFieldValue(name, query.trim());
        setFieldTouched(name, true);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [query, name, setFieldValue, setFieldTouched]);

  const filtered = groups.filter((g) =>
    g.name.toLowerCase().includes(query.toLowerCase()),
  );

  const selectGroup = (value: string) => {
    setQuery(value);
    setFieldValue(name, value);
    setFieldTouched(name, true);
    setOpen(false);
  };

  return (
    <div className="space-y-1" ref={containerRef}>
      <input
        value={query}
        onChange={(e) => {
          //Update Formik on every change
          const value = e.target.value;
          setQuery(value);
          setFieldValue(name, value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full p-2 text-sm focus:outline-none focus:ring-0 bg-transparent dark:bg-gray-500"
      />

      {meta.error && <p className="text-sm text-red-500">{meta.error}</p>}

      {open && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full rounded-xl border bg-gray-500 shadow-md max-h-48 overflow-auto">
          {filtered.map((g) => (
            <li
              key={g.name}
              onClick={() => selectGroup(g.name)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-300"
            >
              {g.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupSelect;
