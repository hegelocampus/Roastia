import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./session/Login";
import Nav from "./session/Nav";
import Register from "./session/Register";

export default () => {
  return (
    <React.Fragment>
      <header>
        <h1>Roastia</h1>
        <Nav />
      </header>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Register} routeType="auth" />
      </Switch>
    </React.Fragment>
  );
};
