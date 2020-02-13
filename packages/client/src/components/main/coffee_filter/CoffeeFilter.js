import './CoffeeFilter.scss';
import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";

import CoffeeIndex from './CoffeeIndex';
import Queries from '../../../graphql/queries';
const { FETCH_SHOP_COFFEES } = Queries;

const FLAVORS = ['floral', 'fruit', 'chocolate', 'nuts', 'spice', 'roast', 'sugar'];
const PROCESSES = ['unknown', 'honey', 'washed', 'dry'];
const ROASTS = ['unknown', 'light', 'medium-light', 'medium', 'medium-dark', 'dark'];
const PRICES = [
  ['Under $10', [0, 10]],
  ['$10 - $20', [10, 20]],
  ['$20 - $30', [20, 30]],
];

export default ({ coffees }) => {
  const [fetchedCoffees, setCoffees] = useState(coffees);
  const [filter, setFilter] = useState({
    processing: '',
    roasting: '',
    price: new Set(),
    flavor: new Set()
  });

  const { error, data, refetch } = useQuery(FETCH_SHOP_COFFEES, {
    variables: {
      coffeeIds: coffees.map(coffee => coffee.id),
      filter: {
        ...filter,
        price: [...filter.price.values()],
        flavor: [...filter.flavor.values()],
      }
    },
  });

  useEffect(() => {
    refetch({ filter }).then(res => {
      setCoffees(res.data.fetchShopCoffees);
    });
  },
    [filter, coffees]
  );

  if (error) {
    console.log(error);
  }

  const updateAttribute = (type) => {
    return ({ target: { name }}) => {
      setFilter(oldFilter => {
        let attributes = oldFilter[type];
        if (attributes.has(name)) {
          attributes.delete(name);
        } else {
          attributes.add(name);
        }
        return {
          ...oldFilter,
          [type]: attributes
        };
      });
    }
  };

  const updatePrice = (e) => {
    setFilter(oldFilter => {
      let newPrice;
      const str = e.target.name;
      const parsed = str.split(',').map(Number);
      if (JSON.stringify(oldFilter['price']) === JSON.stringify(parsed)) {
        newPrice = [];
      } else {
        newPrice = parsed;
      }
      return {
        ...oldFilter,
        price: newPrice
      };
    });
  };

  const flavorInputs = FLAVORS.map((name, i) => (
    <div className="option" key={`${name}${i}`}>
      <input
        type="checkbox"
        name={name}
        onClick={updateAttribute('flavor')}
      />
      <label>{name}</label>
    </div>
  ));
  const processInputs = PROCESSES.map((name, i) => (
    <div className="option" key={`${name}${i}`}>
      <input
        type="checkbox"
        name={name}
        onClick={updateAttribute('processing')}
      />
      <label>{name}</label>
    </div>
  ));
  const roastInputs = ROASTS.map((name, i) => (
    <div className="option" key={`${name}${i}`}>
      <input
        type="checkbox"
        name={name}
        onClick={updateAttribute('roasting')}
      />
      <label>{name}</label>
    </div>
  ));
  const priceInputs = PRICES.map(([string, value], i) => (
    <div className="option" key={`${string}${i}`}>
      <input
        type="checkbox"
        name={value}
        onClick={updatePrice}
      />
      <label>{string}</label>
    </div>
  ));

  return (
    <div>
      <div className="cofee-filter-container">
        <div className="coffee-filter-section">
          <span>Flavor</span>
          <div className="coffee-filter-options">
            {flavorInputs}
          </div>
        </div>
        <div className="coffee-filter-section">
          <span>Processing Method</span>
          <div className="coffee-filter-options">
            {processInputs}
          </div>
        </div>
        <div className="coffee-filter-section">
          <span>Roast Level</span>
          <div className="coffee-filter-options">
            {roastInputs}
          </div>
        </div>
        <div className="coffee-filter-section">
          <span>Price</span>
          <div className="coffee-filter-options">
            {priceInputs}
          </div>
        </div>
      </div>
      <CoffeeIndex coffees={ fetchedCoffees } />
    </div>
  );
}

