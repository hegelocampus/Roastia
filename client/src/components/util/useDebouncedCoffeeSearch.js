import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import DebouncePromise from 'awesome-debounce-promise';
import { useApolloClient } from '@apollo/react-hooks';
import { useAsync } from 'react-async-hook';

import Queries from '../../graphql/queries';
const { SEARCH_COFFEES } = Queries;

export default props => {
  const client = useApolloClient();
  const [filter, setFilter] = useState('');

  const [debouncedQuery] = useState(
    () => DebouncePromise((value) => {
      if (value.length < 1) {
        return [];
      } else {
        return client.query({
          query: SEARCH_COFFEES,
          variables: { filter: value },
        }).then(({ data: { searchCoffees } }) => {
          return searchCoffees;
        }, e => {
          return [];
        })
      }
    },
      150
    )
  )

  const search = useAsync(debouncedQuery, [filter]);

  return {
    filter,
    setFilter,
    search
  }
}

