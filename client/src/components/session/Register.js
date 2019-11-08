import React from "react";
import { Formik, Form, Field } from "formik";
import useSession from "./useSession";

import Mutations from "../../graphql/mutations";
const { REGISTER_USER } = Mutations;

export default props => {
  const [registerUser] = useSession(REGISTER_USER);

  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: ""
      }}
      onSubmit={values => registerUser({ variables: values })}
    >
      <Form>
        <label htmlFor="email">Email:</label>
        <Field name="email" autoComplete="email" type="email" />
        <label htmlFor="Name">Name:</label>
        <Field name="name" autoComplete="username" type="text" />
        <label htmlFor="password">Password:</label>
        <Field name="password" autoComplete="new-password" type="password" />
        <button type="submit">Sign up</button>
      </Form>
    </Formik>
  );
};
