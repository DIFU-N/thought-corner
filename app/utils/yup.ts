import * as Yup from "yup";

export const loginFormSchema = Yup.object().shape({
  username: Yup.string().required("required"),
  password: Yup.string()
    .min(4, "min 4 characters")
    .max(10, "max 10 characters")
    .required("required"),
});

export const addThoughtSchema = Yup.object().shape({
  title: Yup.string().required("Dude you know you have to come up with one."),
  subtitle: Yup.string().required(
    "Dude you know you have to come up with one.",
  ),
  // body: Yup.object().required('Dude you know you have to come up with one.'),
  body: Yup.mixed()
    .required("Dude you know you have to come up with one.")
    .test(
      "has-content",
      "Dude you know you have to come up with one.",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (value: any) => {
        if (!value || !Array.isArray(value.content)) return false;
        return value.content.length > 0;
      },
    ),

  group: Yup.string().required("Dude you know you have to come up with one."),
  // subtitle: Yup.string().required('Dude you know you have to come up with one.'),
});
