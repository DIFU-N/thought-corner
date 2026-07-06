import { useField } from "formik";
import { AddThoughtFormValues } from "@/app/utils/types/formik";
import RichTextEditor from "./textEditor";
import { useSearchParams } from "next/navigation";

const RichTextField = () => {
  const [field, meta, helpers] =
    useField<AddThoughtFormValues["body"]>("body");

  const { value } = field;
  const { setValue, setTouched } = helpers;
  const { error, touched } = meta;

  return (
    <div className="space-y-2">
      <RichTextEditor
        key={value?.content?.length ? "loaded" : "empty"} // force remount
        value={value}
        onChange={(content) => {
          setValue({ ...content }); // new reference
          setTouched(true);        // mark as interacted with
        }}
      />

      {touched && error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default RichTextField;
