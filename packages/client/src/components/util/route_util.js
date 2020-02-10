import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Queries from "../../graphql/queries";

const { IS_LOGGED_IN } = Queries;

export default ({
  component: Component,
  path,
  exact,
  routeType,
  ...rest
}) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  if (loading || error) {
    return null;
  }

  return (routeType === "auth") ? (
    <Route
      {...rest}
      path={path}
      render={props =>
        !data.isLoggedIn ? <Component {...rest} /> : <Redirect to="/" />
      }
    />
  ) : (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn ? <Component {...rest} /> : <Redirect to="/signup" />
      }
    />
  );
};

