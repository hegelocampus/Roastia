import React, { useState, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import useOnOutsideClick from '../../util/useOnOutsideClick';
import './AuthModal.scss';

export default ({ background })=> {
  const history = useHistory();
  const location = useLocation();
  const [formType, setFormType] = useState(location.pathname.match(/([^/]+)\/?$/)[0]);

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
    headerContent = "Sign In";
    form = <Login />;
    footer = (
      <span>
        Don't have an account?
        <Link
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
    headerContent = "Sign up";
    form = <Register />;
    footer = (
      <span>
        Already have an account?
        <Link
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
    <div className="modal-screen" >
      <div className="modal-content" ref={ modalContent }>
        <div className="modal-header">
          <h3 className="modal-header-title">{headerContent}</h3>
        </div>
        {form}
        <div className="modal-content-secondary">{footer}</div>
      </div>
    </div>
  );
};

