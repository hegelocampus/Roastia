import React from "react";
import { Link } from "react-router-dom";
import "./CoffeeShopIndex.scss";
import { BeanIcon, OriginIcon, FlavorIcon } from '../../util/icons';

export default ({ shop, extraContent }) => {
  const randomCoffee = () => shop.coffees[Math.floor(Math.random() * shop.coffees.length)];
  return (
    <li key={shop.id} className="shops-index-item">
      <Link to={`/shop/${shop.id}`}>
        <img
          className="shop-panel-image"
          src={shop.imageURL}
          alt={`profile for ${ shop.name }`}
        />
        <div className="panel-detail">
          <div className="panel-shop">
            <h4>{shop.name}</h4>
            <span>{shop.type}</span>
            <br />
            <span>
              {`${shop.address.city}, ${shop.address.state} ${shop.address.zip}`}
            </span>
          </div>
          <div className="panel-coffee">
            <span className="panel-coffee-subtitle">COFFEE</span>
            <div className="panel-processing">
              <BeanIcon />
              <p>
                {shop.coffees && shop.coffees.length >= 1
                  ? "Processing: " + randomCoffee().processing
                  : "This shop has no coffee!"}
              </p>
            </div>
            <div className="panel-origin">
              <OriginIcon />
              <p>
                {shop.coffees && shop.coffees.length >= 1
                  ? "Origin: " + randomCoffee().origin
                  : "No origin listed"}
              </p>
            </div>
            <div className="panel-flavors">
              <FlavorIcon />
              <p>
                {shop.coffees && shop.coffees.length >= 1
                  ? "Flavors: " + randomCoffee().flavor.slice(0, 2).join(", ")
                  : "No flavors listed"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {extraContent ? extraContent : null}
    </li>
  );
};

