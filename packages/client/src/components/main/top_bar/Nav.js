import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { Link, useHistory } from "react-router-dom";
import AuthLink from "../../util/AuthLink";

import Queries from "../../../graphql/queries";
const { IS_LOGGED_IN } = Queries;

export default props => {
  let history = useHistory();

  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div className="logout">
                  <Link to="/favorites">Saved Coffee Shops</Link>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem("auth-token");
                      client.writeData({ data: { isLoggedIn: false } });
                      history.push("/");
                    }}
                  >
                    Log Out
                  </button>
                </div>
              );
            } else {
              return (
                <div className="login-signup">
                  <AuthLink
                    className="nav-auth-anchor"
                    content="Log in"
                  />
                  {/*
                  <Link
                    to={{
                      pathname: "/signup",
                      state: { background: location }
                    }}
                    className="nav-menu-auth-anchor"
                  >
                    Sign up or Log in
                  </Link>
                  */}
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};
