import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default props => {
  const [formType, setFormType] = useState("login");

  const changeForm = type => {
    return e => {
      e.preventDefault();
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
        <Link to="/signup" onClick={changeForm("signup")} replace>
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
        <Link to="/login" onClick={changeForm("login")} replace>
          Sign In
        </Link>
      </span>
    );
  }

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="modal-header-title">{headerContent}</h3>
      </div>
      {form}
      <div className="modal-content-secondary">{footer}</div>
    </div>
  );
};
