import React from 'react';
import { CoffeeToGoIcon, CoffeeShopIcon, CoffeeFilterIcon } from '../../util/icons';
import styled from 'styled-components';

const AppIntro = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 10px auto;
  width: 80%;
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 33%;
    justify-content: center;
    p {
      font-size: 0.9em;
      width: 70%;
      text-align: center;
      line-height: 1.5;
      @media only screen and (min-width: 1201px) and (max-width: 1500px) {
        font-size: 1.1em;
      }
      @media only screen and (min-width: 1501px) {
        font-size: 1.5em;
      }
    }
  };
`;

const InnerIcon = styled.div`
  @media only screen and (max-width: 1200px) {
    height: 120px;
    margin-bottom: 16px;
  }
  @media only screen and (min-width: 1201px) and (max-width: 1500px) {
    width: 140px;
    height: 140px;
  }
  height: 175px;
  margin-bottom: 25px;
`;

export default () => (
  <AppIntro>
    <div>
      <InnerIcon>
        <CoffeeShopIcon />
      </InnerIcon>
      <p>
        <strong>Search</strong> for coffee shops by location, name or coffee
        name and origin. Our curated list of shops feature coffee with a
        variety of origins, roasts and processing methods.
      </p>
    </div>
    <div>
      <InnerIcon>
        <CoffeeFilterIcon />
      </InnerIcon>
      <p>
        <strong>Filter</strong> coffees by the processing, roast, origin and
        flavors you care about on each shop's page. That way you can easily
        narrow in on the perfect shop and brew.
      </p>
    </div>
    <div>
      <InnerIcon>
        <CoffeeToGoIcon />
      </InnerIcon>
      <p>
        <strong>Save</strong> your favorite shops so you'll know where to
        try next. Every time you log in, you'll be able to access shops
        you've flagged so you can see if they've released any new coffee.
      </p>
    </div>
  </AppIntro>
);

