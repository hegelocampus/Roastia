import './CoffeeShop.scss';
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import AuthLink from '../../util/AuthLink';

import Queries from '../../../graphql/queries';
import AddShopToFavorite from '../favorite/AddShopToFavorite';
import CoffeeFilter from '../coffee_filter/CoffeeFilter';
const { FETCH_SHOP } = Queries;

export default () => {
  const location = useLocation();
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
        <div className="favorite-icon">
          <AddShopToFavorite users={users} shopId={shopId} />
        </div>
        <div className="coffee-shop-info">
          <div className="coffee-shop-main-info">
            <h1>{name}</h1>
            <h3>{address.street}</h3>
            <h3>{`${address.city}, ${address.state} ${address.zip}`}</h3>
          </div>
          <div className="shop-edit">
            <AuthLink
              content="Update shop information"
              notice={true}
              to={{
                pathname: `/shop/${shopId}/edit`,
                state: {
                  background: location,
                  shop: data.coffeeShop,
                },
              }}
            />
          </div>
        </div>
        <div className="coffee-shop-description">
          <h1>Description</h1>
          <p>{description}</p>
        </div>
        <div className="coffee-shop-details">
          <h1>Coffee Shop details for {name}</h1>
          <ul>
            <li>
              <img src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/Coffee+bar+year.png" alt="found-year" />
              Founded in {founded}
            </li>
            <li>
              <img src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/Coffee+bar+type.png" alt="shop-type" />
              {type}
            </li>
            <li>
              <img src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/Coffee+website.png" alt="shop-website" />
              <a href={url}>{url}</a>
            </li>
            <li>
              <img src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/Coffee+satisfaction.png" alt="shop-score" />
              Barista Satisfaction: {baristaSatisfaction}
            </li>
          </ul>
        </div>
      </div>
      <CoffeeFilter allCoffees={coffees} shopId={shopId}/>
    </div>
  );
};
