import React from 'react';
import { Formik, Form, Field } from 'formik';
import useSession from './useSession';
import RenderErrors from '../../util/RenderErrors';

import Mutations from '../../../graphql/mutations';
const { LOGIN_USER } = Mutations;

export default () => {
  const [loginUser, { error }] = useSession(LOGIN_USER);

  const loginGuest = e =>
    loginUser({
      variables: {
        email: 'example@example.com',
        password: 'example',
      },
    });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={values => {
        loginUser({ variables: values });
      }}
    >
      <Form className="login-form">
        <label htmlFor="email">Email</label>
        <Field name="email" autoComplete="username email" type="email" />
        <label htmlFor="password">Password</label>
        <Field
          name="password"
          autoComplete="current-password"
          type="password"
        />
        <button type="submit">Login</button>
        <RenderErrors errors={error} />
        <button type="button" onClick={loginGuest}>
          Guest Login
        </button>
      </Form>
    </Formik>
  );
};
