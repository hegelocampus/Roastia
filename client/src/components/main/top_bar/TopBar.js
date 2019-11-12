import React from "react";
import Nav from "./Nav";
import { Link } from 'react-router-dom';
import "./topBar.scss";

export default () => {
  return (
    <header className="top-bar-container">
      <Link to="/">
        <img
          src="https://roastia.s3.us-east-2.amazonaws.com/roastia+logo-01.png" alt="logo"
          className="roastia-logo"
        />
      </Link>
      <Nav />
    </header>
  );
};
