import React from "react";
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { useLocation } from "react-router-dom";

import CoffeeShopPanel from "./CoffeeShopPanel";
import queryString from 'query-string';
import Queries from '../../../graphql/queries';
const { SEARCH_SHOPS } = Queries;

const ShopIndexUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  width: 100%;
  list-style: none;
  @media only screen and (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (min-width: 1560px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ShopIndexDiv = styled.div`
  margin: 10px auto;
  width: 100%;
  height: 100%;
  max-width: 90%;
`;

export default ({ coffeeShops }) => {
  const queryFilterString = queryString.parse(useLocation().search).filter;
  if (!coffeeShops) {
    const { loading, data, error } = useQuery(SEARCH_SHOPS, {
      variables: { filter: queryFilterString },
    });
    if (data) coffeeShops = data.searchShops;
    if (loading) return <p>Loading ...</p>;
    if (error) return <p> No shops found </p>
  }

  return (
    <ShopIndexDiv>
      <ShopIndexUl>
        {coffeeShops.map((shop, i) => (
          <CoffeeShopPanel key={shop.id + i} shop={shop} />
        ))}
      </ShopIndexUl>
    </ShopIndexDiv>
  );
};

