import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useSession from './useSession';
import FormErrorMessage from '../../util/FormErrorMessage';
import RenderErrors from '../../util/RenderErrors';

import Mutations from '../../../graphql/mutations';
const { REGISTER_USER } = Mutations;

let SignupSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  name: Yup.string().required('Name is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .max(32, 'Password must be shorted than 32 characters long'),
  password2: Yup.string()
    .required('Password Confirmation is required')
    .label('Password Confirmation')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    }),
});

export default props => {
  const [registerUser, { error }] = useSession(REGISTER_USER);

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        password2: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => registerUser({ variables: values })}
    >
      <Form className="signup-form">
        <label htmlFor="email">Email</label>
        <Field name="email" autoComplete="username email" type="email" />
        <FormErrorMessage name="email" />
        <label htmlFor="Name">Name</label>
        <Field name="name" autoComplete="name" type="text" />
        <FormErrorMessage name="name" />
        <label htmlFor="password">Password</label>
        <Field name="password" autoComplete="new-password" type="password" />
        <FormErrorMessage name="password" />
        <label htmlFor="password2">Re-enter password</label>
        <Field name="password2" autoComplete="new-password" type="password" />
        <FormErrorMessage name="password2" />
        <button type="submit">Sign up</button>
        <RenderErrors errors={error} />
      </Form>
    </Formik>
  );
};
