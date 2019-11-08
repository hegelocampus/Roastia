import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import Queries from "../../../graphql/queries";
const { FETCH_SHOP } = Queries;

export default () => {
  const { shopId } = useParams();
  const {
    coffeeShop: { name, address },
    error,
    data
  } = useQuery(FETCH_SHOP, {
    variables: { id: shopId }
  });

  return (
    <div className="coffee-shop">
      <img src="#" alt="coffee-shop" />
      <div className="coffe-shop-info">
        <h1>{name}</h1>
        <h2>{address.street}</h2>
        <h3>{`${address.city}, ${address.state} ${address.zip} `}</h3>
      </div>
    </div>
  );
};
