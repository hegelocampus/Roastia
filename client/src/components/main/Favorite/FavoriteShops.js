import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Queries from "../../../graphql/queries";
const { FETCH_FAVORITE_SHOPS } = Queries;

const FavoriteShops = () => {
  return (
    <Query query={FETCH_FAVORITE_SHOPS} notifyOnNetworkStatusChange>
      {({ loading, error, data, refetch }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        // refetch();

        if (data.fetchFavoriteShops.length === 0) {
          return (
            <div>
              You haven't added any coffee shops yet. Start searching for coffee
              shops to add now.
            </div>
          );
        }
        return (
          <ul>
            {data.fetchFavoriteShops.map(shop => (
              <li key={shop.id} className="shops-index-item">
                <Link to={`/shop/${shop.id}`}>
                  <h4>{shop.name}</h4>
                </Link>
                <span>{shop.address.street}</span>
                <span>
                  {`${shop.address.city}, ${shop.address.state} ${shop.address.zip}`}
                </span>
                <span>{shop.type}</span>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default FavoriteShops;
