import React from "react";
import { Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./session/Login";
import Register from "./session/Register";
import TopBar from "./top_bar/TopBar";

export default () => {
  return (
    <React.Fragment>
      <TopBar />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Register} routeType="auth" />
      </Switch>
    </React.Fragment>
  );
};
