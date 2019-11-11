import React from "react";
import Search from './Search';
import './splash.scss';

export default () => (
  <React.Fragment>
    <section className="splash-main">
      <h1>Discove a coffee shop where you'll love to code</h1>
      <span><Search /></span>
    </section>
  </React.Fragment>
);
