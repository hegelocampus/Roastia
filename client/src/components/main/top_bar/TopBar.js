import React from "react";
import Nav from "./Nav";
import "./topBar.scss";

export default () => {
  return (
    <header className="top-bar-container">
      <h1>Roastia</h1>
      <Nav />
    </header>
  );
};
