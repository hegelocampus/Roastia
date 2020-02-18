import React from 'react';
import styled from 'styled-components';

const CoffeeFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 15px;
  span {
    margin-right: 20px;
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 15px;
  }
  div {
    width: 100%;
    font-size: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const InputOption = styled.label`
  display: flex;
  margin-bottom: 10px;
  white-space: nowrap;
  input {
    margin: 0 5px;
  }
`;

export default ({ values, title, onClick, input, filterPrice = null }) => (
  <CoffeeFilter>
    <span>{title}</span>
    <div>
      {values.map((val, i) =>
        filterPrice !== null ? (
          <InputOption key={val[0] + i}>
            <input
              type="radio"
              name="price"
              value={val[1]}
              onClick={onClick}
              checked={String(val[1]) === String(filterPrice)}
            />
            {val[0]}
          </InputOption>
        ) : (
          <InputOption key={val + i}>
            <input type="checkbox" name={val} onClick={onClick} />
            {val}
          </InputOption>
        )
      )}
    </div>
  </CoffeeFilter>
);
