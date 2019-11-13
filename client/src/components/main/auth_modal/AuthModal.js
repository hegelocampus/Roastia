import React, { useState, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import useOnOutsideClick from "../../util/useOnOutsideClick";
import "./AuthModal.scss";

export default ({ background }) => {
  const history = useHistory();
  const location = useLocation();
  const [formType, setFormType] = useState(
    location.pathname.match(/([^/]+)\/?$/)[0]
  );

  const modalContent = useRef(null);
  useOnOutsideClick(modalContent, e => {
    e.stopPropagation();
    history.goBack();
  });

  const changeForm = type => {
    return e => {
      setFormType(type);
    };
  };

  let headerContent, footer, form;
  if (formType === "login") {
    headerContent = (
      <div className="welcome-message">
        <img
          src="https://roastia.s3.us-east-2.amazonaws.com/roastia+logo-01.png"
          alt="logo"
          className="roastia-logo"
        />
        <h3> Sign in </h3>
        <h3> to save your favorite coffee shops</h3>
      </div>
    );
    form = <Login />;
    footer = (
      <span>
        Don't have an account?
        <Link
          replace
          onClick={changeForm("signup")}
          to={{
            pathname: "/signup",
            state: { background: background }
          }}
        >
          Sign up
        </Link>
      </span>
    );
  } else {
    headerContent = (
      <div className="welcome-message">
        <img
          src="https://roastia.s3.us-east-2.amazonaws.com/roastia+logo-01.png"
          alt="logo"
          className="roastia-logo"
        />
        <h3> Register </h3>
        <h3> to save your favorite coffee shops</h3>
      </div>
    );
    form = <Register />;
    footer = (
      <span>
        Already have an account?
        <Link
          replace
          onClick={changeForm("login")}
          to={{
            pathname: "/login",
            state: { background: background }
          }}
        >
          Log In
        </Link>
      </span>
    );
  }

  return (
    <div className="modal-screen">
      <div className="modal-content" ref={modalContent}>
        <div className="modal-body">
          <div className="modal-header">
            <h3 className="modal-header-title">{headerContent}</h3>
          </div>
          {form}
          <div className="modal-content-secondary">{footer}</div>
        </div>
      </div>
    </div>
  );
};
