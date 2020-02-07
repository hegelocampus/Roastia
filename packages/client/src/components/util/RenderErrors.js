import React from 'react';

export default ({errors}) => (
  <React.Fragment>
    {errors ? (
      <div>
        {errors.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
      </div>
    ) : (
      null
    )}
  </React.Fragment>
)

