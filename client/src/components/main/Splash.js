import React from 'react';
import Search from './Search';
import { CoffeeToGoIcon, CoffeeShopIcon, CoffeeFilterIcon } from '../util/icons';
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
          <div className="inner-icon">
            <CoffeeShopIcon />
          </div>
          <p>
            <strong>Search</strong> for coffee shops by location, name or coffee
            name and origin. Our curated list of shops feature coffee with a 
            variety of origins, roasts and processing methods.
          </p>
        </div>
        <div>
          <div className="inner-icon">
            <CoffeeFilterIcon />
          </div>
          <p>
            <strong>Filter</strong> coffees by the processing, roast, origin and
            flavors you care about on each shop's page. That way you can easily 
            narrow in on the perfect shop and brew.
          </p>
        </div>
        <div>
          <div className="inner-icon">
            <CoffeeToGoIcon />
          </div>
          <p>
            <strong>Save</strong> your favorite shops so you'll know where to
            try next. Every time you log in, you'll be able to access shops you've 
            flagged so you can see if they've released any new coffee.
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
    </footer>
  </React.Fragment>
);
