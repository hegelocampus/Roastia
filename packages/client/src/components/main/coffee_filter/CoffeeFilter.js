import './CoffeeFilter.scss';
import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";

import InputSection from './InputSection';
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
    price: [0, 100],
    roasting: new Set(),
    processing: new Set(),
    flavor: new Set()
  });

  const { error, data, refetch } = useQuery(FETCH_SHOP_COFFEES, {
    variables: {
      shopId,
      filter: {
        ...filter,
        roasting: Array.from(filter.roasting),
        flavor: Array.from(filter.flavor),
        processing: Array.from(filter.processing)
      }
    },
  });

  useEffect(() => {
    refetch().then(res => {
      setCoffees(res.data.fetchShopCoffees);
    });
  },
    [filter, refetch]
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

  return (
    <div>
      <div className="cofee-filter-container">
        <InputSection
          values={ FLAVORS }
          title="Flavor"
          onClick={updateAttribute('flavor')}
        />
        <InputSection
          values={ PROCESSES }
          title="Processing Method"
          onClick={updateAttribute('processing')}
        />
        <InputSection
          values={ ROASTS }
          title="Roast Level"
          onClick={updateAttribute('roasting')}
        />
        <div className="coffee-filter-section">
          <span>Price</span>
          <div className="coffee-filter-options">
            {PRICES.map(
            ))}
          </div>
        </div>
      </div>
      <CoffeeIndex coffees={ coffees } />
    </div>
  );
}

