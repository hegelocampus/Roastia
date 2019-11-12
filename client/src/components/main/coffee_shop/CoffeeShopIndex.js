import React from "react";
import { Link, useLocation } from 'react-router-dom';

export default ({ coffeeShops })=> {
  coffeeShops = coffeeShops || useLocation().state.coffeeShops;
  return (
    <div className="shops-index-div">
      <ul>
        {coffeeShops.map(shop => (
          <li key={shop.id} className="shops-index-item">
            <Link to={ `/shop/${ shop.id }` }>
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
    </div>
  );
};

