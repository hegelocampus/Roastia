import React from "react";
import { useQuery } from "@apollo/react-hooks";

import Queries from "../../../graphql/queries";
const { FETCH_SHOPS } = Queries;

export default ({ selectors }) => {
  selectors = selectors || {};
  const { data, error, loading } = useQuery(FETCH_SHOPS, {
    variables: { selectors: selectors }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { coffeeShops } = data;
  return (
    <div className="shops-index-div">
      <ul>
        {coffeeShops.map(shop => (
          <li className="shops-index-item">
            <h4>{shop.name}</h4>
            <span>{shop.address.street}</span>
            <span>
              {`${shop.address.city}, ${shop.address.state} ${shop.address.zip}`}
            </span>
            <span>{shop.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
