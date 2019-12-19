import React from 'react';
import useAddShopToCoffee from './useAddShopToCoffee';
import useDebouncedSearch from '../../util/useDebouncedSearch';
//import './search.scss';

export default ({ coffeeId }) => {
  const addRelation = useAddShopToCoffee(coffeeId);
  const { filter, setFilter, search} = useDebouncedSearch();

  return (
    <form className="cafe-search-bar-container" onSubmit={ e => e.preventDefault() }>
      <label>Add a cafe
        <input
          placeholder="Enter a city, state, or name..."
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </label>
      {search.loading && <div className="search-loading">Searching...</div>}
      {search.error && <div>Error: {search.error.message}</div>}
      {search.result && (
        <ul>
          {search.result.map((shop, i) => (
          <li
            className="form-search"
            key={shop.id + i}
            onClick={e => {
              e.preventDefault();
              addRelation(shop);
            }}
          >
            <div className="suggestion">
              <span>{shop.name}</span>
              <span>
                {`${shop.address.city}, ${shop.address.state} ${shop.address.zip}`}
              </span>
            </div>
          </li>
          ))}
        </ul>
      )}
    </form>
  );
}

