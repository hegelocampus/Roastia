import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Suggestion = styled.div`
  display: border-box;
  height: 100%;
  max-width: 100%;
  padding: 10px 20px;
  div {
    display: flex;
    justify-content: space-between;
  }
`

export default ({ suggestion: { id, founded, name, address, origin } }) => {
  const history = useHistory();

  return (
    <Suggestion onClick={ e => {
      e.stopPropagation();
      history.push(`/shop/${id}`);
    }} >
      {founded && (
        <div>
          <span>{name}</span>
          <span>
            {`${address.city}, ${address.state} ${address.zip}`}
          </span>
        </div>
      )}
      {origin && (
        <div>
          <span>{name}</span>
          <span>Origin: {origin}</span>
        </div>
      )}
    </Suggestion>
  );
}

