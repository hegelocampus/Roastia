import React from 'react';
import { Formik, Form, Field } from 'formik';
import RenderErrors from '../../../util/render_errors';
import { useDispatch } from 'react-redux';
import { login, signup } from "../../../actions/session_actions";

export default (props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <RenderErrors />
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          password2: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          let process = (props.formType === 'login' ? login : signup);
          dispatch(process(values)).then(
            () => {
              setSubmitting(false);
            }
          );
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form className="session-form">
            { props.formType === 'signup' ? (
              <React.Fragment>
                <p> Username must be between 2 and 30 characters. Choose wisely! Other members of your community will be able to see </p>
                <Field
                  name='username'
                  placeholder='Username'
                  type='text'
                />
              </React.Fragment>
            ) : (
              null
            )}
            <Field
              name='email'
              placeholder='E-mail'
              type='email'
            />
            <Field
              name='password'
              placeholder='Password'
              type='password'
              required
            />
            {(props.formType === 'signup' ? (
              <>
                <Field
                  name='password2'
                  placeholder='Confirm Password'
                  type='password'
                />
                <button
                  type='submit'
                  disabled={ isSubmitting }
                  className="big-button"
                >
                  Create Account
                </button>
              </>
            ):(
              <>
                <button
                  type='submit'
                  disabled={ isSubmitting }
                  className="big-button"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    dispatch(login({
                      email: "test@test.com",
                      password: "testpass1"
                    }))
                  }}
                  disabled={ isSubmitting }
                  className="big-button"
                >
                  Guest Login
                </button>
              </>
            ))}
          </Form>
        )}
      />
    </React.Fragment>
  );
}

