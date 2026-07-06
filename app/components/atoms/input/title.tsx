import { useField } from "formik";
import React from "react";

interface TitleInputProps {
  name: string;
  placeholder?: string;
  className?: string;
}

const CustomInput: React.FC<TitleInputProps> = ({
  name,
  className,
  placeholder,
}) => {
  const [field, meta] = useField(name); // connect to Formik

  return (
    <div className="flex flex-col">
      <input
        {...field}
        placeholder={placeholder || "Title"}
        className={className || "w-full border p-2 rounded"}
      />
      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm">{meta.error}</span>
      )}
    </div>
  );
};

export default CustomInput;
