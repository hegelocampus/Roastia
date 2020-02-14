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
  ['Any', [0, 100]],
  ['Under $10', [0, 10]],
  ['$10 - $20', [10, 20]],
  ['$20 - $30', [20, 30]],
];

export default ({ shopId, allCoffees = [] }) => {
  const [coffees, setCoffees] = useState(allCoffees);
  const [filter, setFilter] = useState({
    processing: '',
    roasting: '',
    price: [0, 100],
    flavor: new Set()
  });

  const { error, data, refetch } = useQuery(FETCH_SHOP_COFFEES, {
    variables: {
      shopId,
      filter: {
        ...filter,
        flavor: Array.from(filter.flavor) || []
      }
    },
  });

  useEffect(() => {
    refetch({
      filter: {
        ...filter,
        flavor: Array.from(filter.flavor) || []
      }
    }).then(res => {
      setCoffees(res.data.fetchShopCoffees);
    });
  },
    [filter, coffees, refetch]
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

  const updatePrice = ({ target: { name, value }}) => {
    setFilter(oldFilter => ({
      ...oldFilter,
      price: value.split(',').map(Number)
    }));
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
        name="roast"
        value={name}
        onClick={updateAttribute('roasting')}
      />
      <label>{name}</label>
    </div>
  ));

  const priceInputs = PRICES.map(([string, value], i) => (
    <div className="option" key={`${string}${i}`}>
      <input
        type="radio"
        name="price"
        value={value}
        onChange={updatePrice}
        checked={String(value) === String(filter.price)}
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
      <CoffeeIndex coffees={ coffees } />
    </div>
  );
}

