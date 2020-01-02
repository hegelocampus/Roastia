import React from 'react';
import useAddCoffeeToShop from './useAddCoffeeToShop';
import useDebouncedCoffeeSearch from '../../util/useDebouncedCoffeeSearch';
//import './search.scss';

export default ({ shop }) => {
  const addRelation = useAddCoffeeToShop(shop);
  const { filter, setFilter, search} = useDebouncedCoffeeSearch();

  console.log(search);
  return (
    <form className="coffee-search-bar-container" onSubmit={ e => e.preventDefault() }>
      <label>Add a coffee
        <input
          placeholder="Enter a coffee, roast, or process..."
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </label>
      {search.loading && <div className="search-loading">Searching...</div>}
      {search.error && <div>Error: {search.error.message}</div>}
      {search.result && (
        <ul>
          {search.result.map((coffee, i) => (
          <li
            className="form-search"
            key={coffee.id + i}
            onClick={e => {
              e.preventDefault();
              addRelation(coffee.id);
            }}
          >
            <div className="suggestion">
              <span>{coffee.name}</span>
              <span>
                {`${coffee.origin}`}
              </span>
            </div>
          </li>
          ))}
        </ul>
      )}
    </form>
  );
}

