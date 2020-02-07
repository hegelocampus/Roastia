import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import Mutations from './graphql/mutations';
const { VERIFY_USER } = Mutations;

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || object._id ||null,
});

const httpLink =
  process.env.NODE_ENV === 'production'
    ? new HttpLink({
        uri: 'https://roastia.herokuapp.com/graphql',
        credentials: 'same-origin',
      })
    : new HttpLink({
        uri: 'http://localhost:5000/graphql',
      });


const token = localStorage.getItem('auth-token');
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => {
    const token = localStorage.getItem('auth-token');
    return {
        headers: {
      authorization: token ? token : '',
      ...headers,
    }
    }
  });
  return forward(operation)
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => console.log(message));
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: cache,
  resolvers: {},
  onError: errorLink
});

cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
  },
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn,
        },
      });
    });
}

const Root = () => <App client={client} />;

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

