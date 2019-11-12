import React from "react";
import { Formik, Form, Field } from "formik";
import useSession from "./useSession";
import RenderErrors from "../../util/RenderErrors";

import Mutations from "../../../graphql/mutations";
const { LOGIN_USER } = Mutations;

export default props => {
  const [loginUser, { error }] = useSession(LOGIN_USER);

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      onSubmit={values => {
        loginUser({ variables: values });
      }}
    >
      <Form>
        <label htmlFor="email">Email</label>
        <Field name="email" autoComplete="email" type="email" />
        <label htmlFor="password">Password</label>
        <Field
          name="password"
          autoComplete="current-password"
          type="password"
        />
        <button type="submit">Login</button>
        <RenderErrors errors={ error } />
      </Form>
    </Formik>
  );
};
