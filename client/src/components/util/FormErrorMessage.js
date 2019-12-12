import React from 'react';
import { ErrorMessage } from 'formik';
import './FormErrorMessage.scss';

export default (props) => (
  <ErrorMessage {...props}>
    {msg => <span className="form-error">{msg}</span>}
  </ErrorMessage>
)
