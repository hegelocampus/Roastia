import React from 'react';
import Search from './Search';
import './splash.scss';

export default () => (
  <React.Fragment>
    <section className="splash-main-container">
      <div className="splash-backdrop"></div>
      <div className="splash-main">
        <div className="splash-backdrop-blur" />
        <div className="splash-inner">
          <h1>Discover a coffee shop where you'll love to code</h1>
          <Search />
        </div>
      </div>
    </section>
  </React.Fragment>
);
