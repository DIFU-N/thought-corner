"use client";
import React from "react";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks/dispatch";
import { LoginFormInitialValues } from "@/app/utils/types/formik";
import { loginFormSchema } from "@/app/utils/yup";
import { login } from "@/app/redux/thunks/authThunks";

const initialValues: LoginFormInitialValues = {
  username: "",
  password: "",
};

type Props = {
  onAuthViewChange?: () => void;
};

const LoginForm: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } = useAppSelector((state) => state.auth);

  const onLoginFormSubmit = async (values: LoginFormInitialValues) => {
    const resultAction = await dispatch(
      login({
        username: values.username,
        password: values.password,
      }),
    );

    if (login.fulfilled.match(resultAction)) {
      router.push("/");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginFormSchema}
      onSubmit={onLoginFormSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors }) => (
        <Form className="w-full flex px-2 flex-col pt-3 pb-8 max-w-xl bg-white drop-shadow-lg rounded-xl">
          <div className="space-y-4">
            <div className="space-y-2">
              <Field
                name="username"
                type="text"
                placeholder="Username"
                className="w-full border p-2 rounded"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}

              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

            {error && (
              <span className="text-red-500 text-sm text-center">{error}</span>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
