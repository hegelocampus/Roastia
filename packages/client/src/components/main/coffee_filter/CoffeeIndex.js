import React from 'react';
import { Link } from 'react-router-dom';

export default ({ coffees }) => {
  return (coffees.length === 0) ? (
    <p>No coffees match your search!</p>
  ) : (
    <div className="filtered-coffee-container">
      {coffees.map((coffee, i) => (
        <div className="coffee-info-pan" key={coffee.id + i}>
          <img
            src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/Coffee+bean.jpg"
            alt="coffee-img"
          />
          <div className="coffee-detail">
            <li>{coffee.name}</li>
            <li>{coffee.origin}</li>
          </div>
          <Link to={`/coffee/${coffee.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

