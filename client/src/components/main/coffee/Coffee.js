import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import Queries from "../../../graphql/queries";
import AddShopToFavorite from "../Favorite/AddShopToFavorite";
const { FETCH_COFFEE } = Queries;

export default () => {
  const { coffeeId } = useParams();
  const { data, error, loading } = useQuery(FETCH_COFFEE, {
    variables: { id: coffeeId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const {
    coffee: {
      id,
      name,
      origin,
      processing,
      roasting,
      flavor,
      price,
      shops = []
    }
  } = data;
  return (
    <div className="coffee-detail">
      <img src="nope" alt={`${name} coffee bag`} />
      <div className="coffee-main-info">
        <h1>{name}</h1>
        <h4>{origin}</h4>
      </div>
      <div className="coffee-extra-info">
        <ul>
          <li>
            <s>Origin:</s>
            <span>{ origin }</span>
          </li>
          <li>
            <s>Roast:</s>
            <span>{roasting}</span>
          </li>
          <li>
            <s>Processing Method:</s>
            <span>{processing}</span>
          </li>
          <li>
            <s>Price:</s>
            <span>{price}</span>
          </li>
        </ul>
        <section>
          <h5>Coffee shops who serve this coffee:</h5>
          <ul className="coffee-detail-coffeeshop-ul">
            {shops.map(shop => (
              <li className="shop-li" key={shop.id}>
                <Link to={`/shop/${shop.id}`}>
                  <h6>{shop.name}</h6>
                  <span>{
                    `${shop.address.city}, ${shop.address.state} ${shop.address.zip}`
                  }</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

