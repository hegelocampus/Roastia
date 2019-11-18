import React from 'react';
import Nav from './Nav';
import { Link, useLocation } from 'react-router-dom';
import AuthLink from '../../util/AuthLink';
import AddDropDown from './AddDropDown';
import './topBar.scss';

export default () => {
  const location = useLocation();
  return (
    <header className="top-bar-container">
      <nav>
        <Link to="/">
          <img
            src="https://roastia.s3.us-east-2.amazonaws.com/roastia+logo-01.png"
            alt="logo"
            className="roastia-logo"
          />
        </Link>
        <div className="forms-dropdown">
          {/* <AuthLink
            content='Add Shop'
            to={{
              pathname: '/new/shop',
              state: {
                background: location
              }
            }}
          />
          <AuthLink
            content='Add Coffee'
            to={{
              pathname: '/new/coffee',
              state: {
                background: location
              }
            }}
          /> */}
          <AddDropDown location={location}/>
          <Nav />
        </div>
      </nav>
    </header>
  );
};
