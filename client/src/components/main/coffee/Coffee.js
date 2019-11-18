import React from "react";
import AuthLink from '../../util/AuthLink';
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import AddShopToCoffee from './AddShopToCoffeeSearch';
import CoffeeShopPanel from '../coffee_shop/CoffeeShopPanel';
import './Coffee.scss';

import Queries from "../../../graphql/queries";
const { FETCH_COFFEE } = Queries;

export default () => {
  const location = useLocation();
  const { coffeeId } = useParams();
  const { data, error, loading } = useQuery(FETCH_COFFEE, {
    variables: { id: coffeeId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const {
    coffee: { id, name, origin, processing, roasting, flavor, price, shops = [] }
  } = data;

  return (
    <div className="coffee-detail">
      <div className="coffee-main-info">
        <h1>{name}</h1>
        <h4>{origin}</h4>
      </div>
      <div className="coffee-extra-info">
        <ul>
          <li>
            <s>Origin:</s>
            <span>{origin}</span>
          </li>
          <li>
            <s>Roast:</s>
            <span>{roasting}</span>
          </li>
          <li>
            <s>Process:</s>
            <span>{processing}</span>
          </li>
          <li>
            <s>Flavor:</s>
            <span>{flavor}</span>
          </li>
          <li>
            <s>Price:</s>
            <span>{price}</span>
          </li>
        </ul>
        <section className="coffee-detail-shop-index">
          <h5>Coffee shops who serve this coffee:</h5>
          <ul>
            {shops.map((shop, i) => (
              <React.Fragment key={shop.id + i}>
                <CoffeeShopPanel
                  shop={shop}
                  extraContent={(
                  <AuthLink
                  className="remove-shop-link"
                  to={{
                    pathname: '/relation/remove',
                    state: {
                      background: location,
                      shopId: shop.id,
                      coffeeId: id,
                    }
                  }}
                  notice={true}
                  content="Remove shop"
                />)}
              />
              </React.Fragment>
            ))}
          </ul>
          <AddShopToCoffee coffeeId={ id } />
        </section>
      </div>
    </div>
  );
};

