import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import InputSection from './InputSection';
import CoffeeIndex from './CoffeeIndex';

import Queries from '../../../graphql/queries';
const { FETCH_SHOP_COFFEES } = Queries;

const FLAVORS = [
  'floral',
  'fruit',
  'chocolate',
  'nuts',
  'spice',
  'roast',
  'sugar',
];
const PROCESSES = ['unknown', 'honey', 'washed', 'dry'];
const ROASTS = [
  'unknown',
  'light',
  'medium-light',
  'medium',
  'medium-dark',
  'dark',
];
const PRICES = [
  ['Any', [0, 100]],
  ['Under $10', [0, 10]],
  ['$10 - $20', [10, 20]],
  ['$20 - $30', [20, 30]],
];

const IndexContainer = styled.div`
  display: flex;
  padding: 25px 20px 20px 20px;
  box-shadow: 1px 2px 5px gray;
  min-width: 100%;
  background: #ccb6a0;
  margin-bottom: 30px;
  border-radius: 5px;
  box-sizing: border-box;
  transition: flex 0.3s 2s;
`;

const Filters = styled.div`
  display: flex;
  width: 38%;
  flex-direction: column;
  padding: 0 0 0 15px;
`;

export default ({ shopId }) => {
  const [filter, setFilter] = useState({
    price: [0, 100],
    roasting: new Set(),
    processing: new Set(),
    flavor: new Set(),
  });

  const { data, loading } = useQuery(FETCH_SHOP_COFFEES, {
    variables: {
      shopId,
      filter: {
        ...filter,
        roasting: Array.from(filter.roasting),
        flavor: Array.from(filter.flavor),
        processing: Array.from(filter.processing),
      },
    },
  });

  const updateAttribute = type => ({ target: { name } }) => {
    setFilter(oldFilter => {
      let attributes = oldFilter[type];

      if (attributes.has(name)) {
        attributes.delete(name);
      } else {
        attributes.add(name);
      }

      return {
        ...oldFilter,
        [type]: attributes,
      };
    });
  };

  return (
    <IndexContainer>
      <Filters>
        <InputSection
          values={FLAVORS}
          title="Flavor"
          onClick={updateAttribute('flavor')}
        />
        <InputSection
          values={PROCESSES}
          title="Processing Method"
          onClick={updateAttribute('processing')}
        />
        <InputSection
          values={ROASTS}
          title="Roast"
          onClick={updateAttribute('roasting')}
        />
        <InputSection
          values={PRICES}
          title="Price"
          filterPrice={filter.price}
          onClick={({ target }) =>
            setFilter(oldFilter => ({
              ...oldFilter,
              price: target.value.split(',').map(Number),
            }))
          }
        />
      </Filters>
      <CoffeeIndex coffees={data && data.fetchShopCoffees} loading={loading} />
    </IndexContainer>
  );
};
