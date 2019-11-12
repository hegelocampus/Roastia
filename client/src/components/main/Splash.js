import React from "react";
import Search from "./Search";
import "./splash.scss";

export default () => (
  <React.Fragment>
    <section className="splash-main">
      <div className="splash-inner">
        <h1>Discover a coffee shop where you'll love to code</h1>
        <Search />
      </div>
    </section>
  </React.Fragment>
);

