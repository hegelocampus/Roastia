import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useSession from "./useSession";

import Mutations from "../../../graphql/mutations";
const { REGISTER_USER } = Mutations;

let SignupSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid"),
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .required()
    .min(5, "Password must be at least 5 characters long")
    .max(32, "Password must be shorted than 32 characters long"),
  confirmPassword: Yup.string()
    .required()
    .label("Confirm password")
    .test("passwords-match", "Passwords must match", function(value) {
      return this.parent.password === value;
    })
});

export default props => {
  const [registerUser] = useSession(REGISTER_USER);

  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        passwordConfirm: ""
      }}
      validationSchema={SignupSchema}
      onSubmit={values => registerUser({ variables: values })}
    >
      <Form>
        <label htmlFor="email">Email:</label>
        <Field name="email" autoComplete="email" type="email" />
        <label htmlFor="Name">Name:</label>
        <Field name="name" autoComplete="username" type="text" />
        <label htmlFor="password">Password:</label>
        <Field name="password" autoComplete="new-password" type="password" />
        <label htmlFor="passwordConfirm">Re-enter password:</label>
        <Field
          name="passwordConfirm"
          autoComplete="new-password"
          type="password"
        />
        <button type="submit">Sign up</button>
      </Form>
    </Formik>
  );
};
