import React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";
import MainContainer from "./main/MainContainer";
import "./App.scss";

export default ({ client }) => (
  <ApolloProvider client={client}>
    <Router>
      <MainContainer />
    </Router>
  </ApolloProvider>
);

