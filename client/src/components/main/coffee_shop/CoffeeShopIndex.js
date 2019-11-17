import "./CoffeeShopIndex.scss";
import { useQuery } from '@apollo/react-hooks';
import React from "react";
import { useLocation } from "react-router-dom";
import CoffeeShopPanel from "./CoffeeShopPanel";
import queryString from 'query-string';
import Queries from '../../../graphql/queries';
const { SEARCH_SHOPS } = Queries;

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
    <div className="shops-index-div">
      <ul>
        {coffeeShops.map(shop => (
          <CoffeeShopPanel key={shop.id} shop={shop} />
        ))}
      </ul>
    </div>
  );
};
