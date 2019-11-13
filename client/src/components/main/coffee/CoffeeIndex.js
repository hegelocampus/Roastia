import React from "react";
import { Link, useLocation } from "react-router-dom";

export default ({ coffees }) => {
  coffees = coffees || useLocation().state.coffees;
  return (
    <div className="coffees-index-div">
      <ul>
        {coffees.map(({ id, name, origin, processing, shop }) => (
          <li key={id} className="coffee-index-item">
            <Link to={`/coffee/${id}`}>
              <h4>{name}</h4>
            </Link>
            <span>{origin}</span>
            <span>{processing}</span>
            {shop && (
              <span>
                {`${shop.address.city}, ${shop.address.state} ${shop.address.zip}`}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
