import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import Queries from '../../../graphql/queries';

import './FavoriteShops.scss';

const { FETCH_FAVORITE_SHOPS } = Queries;

const FavoriteShops = () => {
  return (
    <Query query={FETCH_FAVORITE_SHOPS}>
      {({ loading, error, data }) => {

        if (loading) return 'Loading...';
        if (error) return 'Error';

        if (data.fetchFavoriteShops.length === 0) {
          return (
            <div className="saved-shops">
              <div className="saved-header">Saved Coffee Shops </div>
              <div className="search-results-container">
                <div className="no-search-results">
                  <li> You haven't added any coffee shops yet. </li>
                  <li> Start searching for coffee shops to add now. </li>
                </div>
                <Link to="/">Search Coffee Shops</Link>
              </div>
            </div>
          );
        }
        return (
          <div className="saved-shops">
            <div className="saved-header">Saved Coffee Shops </div>
            <div className="saved-shops-container">
              {data.fetchFavoriteShops.map(shop => (
                <div key={shop.id} className="shop-item">
                  <img src={shop.imageURL} alt="shop" />
                  <div className="shop-item-detail">
                    <li className="shop-item-name">{shop.name}</li>
                    <div className="shop-item-address">
                      <li>{`${shop.address.street}`}</li>
                      <li>{`${shop.address.city}, ${shop.address.state} ${shop.address.zip}`}</li>
                    </div>
                    <span className="view-detail">
                      <Link to={`shop/${shop.id}`}>View Details</Link>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default FavoriteShops;
