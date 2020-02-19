import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CoffeeIndex = styled.div`
  flex: 1 0;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  margin-left: 1rem;
`;

const FillerSpan = styled.span`
  flex: 1 0;
  margin-left: 1rem;
  width: 100%;
`;

const CoffeeIndexItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  height: 200px;
  background: white;
  border-radius: 10px;
  margin: 0 25px 25px 0;
  box-shadow: 1px 2px 5px gray;
  a {
    color: black;
    text-decoration: none;
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 130px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

const CoffeeDetail = styled.ul`
  list-style: none;
  font-size: 15px;
  padding: 10px;
  line-height: 1.5;
  li:first-of-type {
    font-weight: bold;
  }
`;

export default ({ coffees, loading }) => (
  <CoffeeIndex>
    {loading || coffees.length === 0 ? (
      <FillerSpan>
        {loading ? 'Loading...' : 'No coffees match your search!'}
      </FillerSpan>
    ) : (
      <>
        {coffees.map((coffee, i) => (
          <CoffeeIndexItem key={coffee.id + i}>
            <Link to={`/coffee/${coffee.id}`}>
              <img
                src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/Coffee+bean.jpg"
                alt="coffee-img"
              />
              <CoffeeDetail>
                <li>{coffee.name}</li>
                <li>{coffee.origin}</li>
              </CoffeeDetail>
            </Link>
          </CoffeeIndexItem>
        ))}
      </>
    )}
  </CoffeeIndex>
);
