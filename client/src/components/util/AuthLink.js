import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link, useLocation } from 'react-router-dom';

import Queries from '../../graphql/queries';
const { IS_LOGGED_IN } = Queries;

export default ({ to, content, notice, ...rest }) => {
  const location = useLocation();
  const { data, error, loading } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return data.isLoggedIn ? (
    <Link to={to} {...rest}>
      {content}
    </Link>
  ) : (
    <Link
      to={{
        pathname: '/login',
        state: {
          background: location,
          notice: notice ? 'You must sign in before performing that action' : null,
        },
      }}
    >
      {content}
    </Link>
  );
};
