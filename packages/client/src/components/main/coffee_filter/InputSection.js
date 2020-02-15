import React from 'react';

export default ({ values, title, onClick, input, filter }) => (
  <div className="coffee-filter-section">
    <span>{title}</span>
    <div className="coffee-filter-options">
      {values.map((val, i) => (
        <label className="option" key={val + i}>
          {val.length ? (
            <input
              type="radio"
              name="price"
              value={val[0]}
              onChange={onClick}
              checked={String(val[0]) === String(filter.price)}
            />
          ) : (
            <input
              type="checkbox"
              name={val}
              onClick={onClick}
            />
          )}
          {value[0] || value}
        </label>
      ))}
    </div>
  </div>
);

