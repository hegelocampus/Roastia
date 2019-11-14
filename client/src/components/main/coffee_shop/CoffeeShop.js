import './CoffeeShop.scss';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Queries from '../../../graphql/queries';
import AddShopToFavorite from '../favorite/AddShopToFavorite';
import CoffeeFilter from '../coffee_filter/CoffeeFilter';
const { FETCH_SHOP } = Queries;

export default () => {
  const { shopId } = useParams();
  const { data, error, loading } = useQuery(FETCH_SHOP, {
    variables: { id: shopId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (data.coffeeShop === null) return <p>Coffee Shop not found!</p>;

  const {
    coffeeShop: {
      name,
      description,
      url,
      imageURL,
      address,
      founded,
      type,
      baristaSatisfaction,
      coffees,
      users,
    },
  } = data;
  return (
    <div className="coffee-shop-container">
      <div className="coffee-shop">
        <img src={imageURL} alt={`${name} coffee shop`} />
        <div className="coffee-shop-info">
          <div className="coffee-shop-main-info">
            <h1>{name}</h1>
            <h3>{address.street}</h3>
            <h3>{`${address.city}, ${address.state} ${address.zip}`}</h3>
          </div>
          <div className="favorite-icon">
            <AddShopToFavorite users={users} shopId={shopId} />
          </div>
        </div>
        <div className="coffee-shop-description">
          <h1>Description</h1>
          <p>{description}</p>
        </div>
        <div className="coffee-shop-details">
          <h1>Coffee Shop details for {name}</h1>
          <ul>
            <li>Founded in {founded}</li>
            <li>{type}</li>
            <li>{url}</li>
            <li>Barista Satisfaction: {baristaSatisfaction}</li>
          </ul>
        </div>
      </div>
      <section className="coffee-section-container">
        <div className="coffee-section">
          <CoffeeFilter shopId={shopId} />
        </div>
      </section>
    </div>
  );
};
