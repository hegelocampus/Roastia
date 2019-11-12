import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../../graphql/queries";
import { Link, useLocation, useHistory } from "react-router-dom";

const { IS_LOGGED_IN } = Queries;

export default props => {
  let location = useLocation();
  let history = useHistory();

  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div className="logout">
                  <button
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem("auth-token");
                      client.writeData({ data: { isLoggedIn: false } });
                      history.push("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              );
            } else {
              return (
                <div className="login-signup">
                  <Link
                    to={{
                      pathname: "/signup",
                      state: { background: location }
                    }}
                    className="nav-menu-auth-anchor"
                  >
                    Log In
                  </Link>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

