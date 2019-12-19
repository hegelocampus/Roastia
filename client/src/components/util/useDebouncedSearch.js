import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import DebouncePromise from 'awesome-debounce-promise';
import { useApolloClient } from '@apollo/react-hooks';
import { useAsync } from 'react-async-hook';

import Queries from '../../graphql/queries';
const { SEARCH_SHOPS } = Queries;

export default props => {
  const client = useApolloClient();
  const [filter, setFilter] = useState('');

  const [debouncedQuery] = useState(
    () => DebouncePromise((value) => {
      if (value.length < 1) {
        return [];
      } else {
        return client.query({
          query: SEARCH_SHOPS,
          variables: { filter: value },
        }).then(({ data: { searchShops }}) => {
          return searchShops;
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

