import React from "react";
import { ApolloProvider } from "react-apollo";
import { HashRouter } from "react-router-dom";
import MainContainer from "./main/MainContainer";

export default ({ client }) => (
  <ApolloProvider client={client}>
    <HashRouter>
      <MainContainer />;
    </HashRouter>
  </ApolloProvider>
);
