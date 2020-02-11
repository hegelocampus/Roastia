import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './AuthModal.scss';

export default ({ background }) => {
  const { pathname, state }= useLocation();
  const [formType, setFormType] = useState(
    pathname.match(/([^/]+)\/?$/)[0]
  );
  const notice = state && state.notice;

  const changeForm = type => e => {
    setFormType(type);
  };

  let headerContent, footer, form;
  if (formType === 'login') {
    headerContent = 'Sign in';
    form = <Login />;
    footer = (
      <span>
        Don't have an account?
        <Link
          replace
          onClick={changeForm('signup')}
          to={{
            pathname: '/signup',
            state: {
              background,
            },
          }}
        >
          Sign up
        </Link>
      </span>
    );
  } else if (formType === 'signup') {
    headerContent = 'Register';
    form = <Register />;
    footer = (
      <span>
        Already have an account?
        <Link
          replace
          onClick={changeForm('login')}
          to={{
            pathname: '/login',
            state: {
              background,
            },
          }}
        >
          Log In
        </Link>
      </span>
    );
  } else {
    return null;
  }

  return (
    <React.Fragment>
      <div className="auth-modal-header">
        <div className="welcome-message">
          <img
            src="https://roastia.s3.us-east-2.amazonaws.com/roastia+logo-01.png"
            alt="logo"
            className="roastia-logo"
          />
          <h3 className="modal-header-title">{headerContent}</h3>
          <h3>{notice || 'to save your favorite coffee shops'}</h3>
        </div>
      </div>
      {form}
      <div className="modal-content-secondary">{footer}</div>
    </React.Fragment>
  );
};
