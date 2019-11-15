import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.scss";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context"; //add apollo-link-client to client's package.json
import { onError } from "apollo-link-error";
import Mutations from "./graphql/mutations";

const { VERIFY_USER } = Mutations;

const token = localStorage.getItem("auth-token");

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth-token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => console.log(message));
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink, errorLink),
  cache,
  resolvers: {},
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

cache.writeData({
  data: {
    isLoggedIn: Boolean(token)
  }
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      });
    });
}

const Root = () => <App client={client} />;

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
