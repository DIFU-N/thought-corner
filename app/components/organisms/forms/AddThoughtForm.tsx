"use client";
import React from "react";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "@/app/hooks/dispatch";
import { AddThoughtFormValues } from "@/app/utils/types/formik";
import { createThought, updateThought } from "@/app/redux/thunks/thoughtThunks";
import CustomInput from "../../atoms/input/title";
import { addThoughtSchema } from "@/app/utils/yup";
import GroupSelect from "../../molecules/select/groupSelect";
import RichTextField from "../textEditor/textField";
import { Thought } from "@/app/utils/types/thoughts";

const initialValues: AddThoughtFormValues = {
  body: {
    type: "doc",
    content: [],
  },
  date: new Date(),
  deleted: false,
  group: "",
  subtitle: "",
  title: "",
};

interface Props {
  thought?: Thought | null;
}

const AddThoughtForm: React.FC<Props> = ({ thought }) => {
  const isEdit = !!thought?.id;

  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.thought);

  const onFormSubmit = async (values: AddThoughtFormValues) => {
    let resultAction;
    if (isEdit) {
      resultAction = await dispatch(
        updateThought({
          id: thought.id,
          body: values.body,
          date: values.date,
          title: values.title,
          subtitle: values.subtitle,
          group: values.group,
        }),
      );
      if (updateThought.fulfilled.match(resultAction)) {
        window.location.href = "/";
      }
    } else {
      resultAction = await dispatch(
        createThought({
          body: values.body,
          date: values.date,
          title: values.title,
          subtitle: values.subtitle,
          group: values.group,
        }),
      );

      if (createThought.fulfilled.match(resultAction)) {
        window.location.href = "/";
      }
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: thought?.title || "",
        subtitle: thought?.subtitle || "",
        group: thought?.group || "",
        body: thought?.body || { type: "doc", content: [] },
        date: thought?.date ? new Date(thought.date) : new Date(),
        deleted: thought?.deleted || false,
      }}
      validationSchema={addThoughtSchema}
      onSubmit={onFormSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors }) => (
        <Form className="w-full flex px-2 flex-col pt-3 pb-8 max-w-xl md:max-w-3xl bg-transparent drop-shadow-lg rounded-xl">
          <div className="space-y-4">
            <div className="space-y-2">
              <CustomInput
                name="title"
                className="border-0 text-6xl bg-transparent font-serif p-2 focus:outline-none focus:ring-0"
                placeholder="Title"
              />

              <CustomInput
                name="subtitle"
                className="border-0 text-3xl bg-transparent font-serif p-2 focus:outline-none focus:ring-0"
                placeholder="Subtitle"
              />
              <GroupSelect name="group" />

              <RichTextField />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="border bg-black text-white p-2 rounded-lg text-xs cursor hover:bg-slate-700"
            >
              {loading ? "Activating..." : isEdit ? "Update" : "Add"}
            </button>

            {/* {errors && (
              <span className="text-red-500 text-sm text-center">{errors.}</span>
            )} */}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddThoughtForm;
