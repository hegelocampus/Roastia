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
      <div className="app-intro">
        <div>
          <img
            src="https://roastia.s3.us-east-2.amazonaws.com/icons8-shop-100.png"
            alt="search-for-shops"
          />
          <p>
            <strong>Search</strong> for coffee shops by location, name or coffee
            origin
          </p>
        </div>
        <div>
          <img
            id="filter"
            src="https://roastia.s3.us-east-2.amazonaws.com/icons8-filter-64.png"
            alt="filter-coffees"
          />
          <p>
            <strong>Filter</strong> coffees by the processing, roast, origin and
            flavors you care about
          </p>
        </div>
        <div>
          <img
            src="https://roastia.s3.us-east-2.amazonaws.com/icons8-coffee-to-go-50.png"
            alt="save-favorites"
          />
          <p>
            <strong>Save</strong> your favorite shops so you'll know where to
            try next
          </p>
        </div>
      </div>
    </section>
    <footer className="splash-footer">
      <a href="https://github.com/hegelocampus/Roastia">
        <img
          src="https://roastia.s3.us-east-2.amazonaws.com/GitHub-Mark-64px.png"
          alt="git"
        />
      </a>
      <div>
        <a target="_blank" href="/icons/set/coffee">
          Above icons
        </a>{' '}
        by:
        <a target="_blank" href="https://icons8.com">
          {' '}
          Icons8
        </a>
      </div>
    </footer>
  </React.Fragment>
);
