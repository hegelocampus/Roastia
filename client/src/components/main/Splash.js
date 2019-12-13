import React from 'react';
import Search from './Search';
import { CoffeeToGoIcon, CoffeeShopIcon, CoffeeFilterIcon, GitHubIcon } from '../util/icons';
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
            try next. Every time you log in, you'll be able to access shops
            you've flagged so you can see if they've released any new coffee.
          </p>
        </div>
      </div>
    </section>
    <footer className="splash-footer">
      <h3>GITHUB AND TEAM</h3>
      <div className="about-team">
        <GitHubIcon />
        <div className="about-team-member tooltip-long">
          <a
            id="linkedin"
            href="https://www.linkedin.com/in/long-mcfarlin-7bb60994/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="about-team-member-img"
              alt="long"
              src="https://roastia.s3.us-east-2.amazonaws.com/long.jpeg"
            ></img>
          </a>
          <span className="long">Long McFarlin</span>
        </div>
        <div className="about-team-member tooltip-bee">
          <a
            id="linkedin"
            href="https://www.linkedin.com/in/bee-ellis-2b126b185/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="about-team-member-img"
              alt="bee"
              src="https://roastia.s3.us-east-2.amazonaws.com/bee.jpeg"
            ></img>
          </a>
          <span className="bee">Bee Ellis</span>
        </div>
        <div className="about-team-member tooltip-john">
          <a
            href="https://www.linkedin.com/in/johnmsteen/"
            target="_blank"
            id="linkedin"
            rel="noopener noreferrer"
          >
            <img
              className="about-team-member-img"
              alt="john"
              src="https://roastia.s3.us-east-2.amazonaws.com/john.jpeg"
            ></img>
          </a>
          <span className="john">John Steen</span>
        </div>
      </div>
    </footer>
  </React.Fragment>
);
