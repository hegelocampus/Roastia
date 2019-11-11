import React from "react";

export default props => {
  const coffeeShops = props.location.state.coffeeShops;
  return (
    <div className="shops-index-div">
      <ul>
        {coffeeShops.map(shop => (
          <li key={shop.id} className="shops-index-item">
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
