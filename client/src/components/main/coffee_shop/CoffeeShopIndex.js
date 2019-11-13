import React from "react";
import { useLocation } from "react-router-dom";
import CoffeeShopPanel from "./CoffeeShopPanel";
import "./CoffeeShopIndex.scss";

export default ({ coffeeShops }) => {
  coffeeShops = coffeeShops || useLocation().state.coffeeShops;
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
