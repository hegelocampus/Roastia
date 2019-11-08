import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./session/Login";
import Register from "./session/Register";
import TopBar from "./top_bar/TopBar";
import Splash from "./Splash";
import CoffeeShop from "./coffee_shop/CoffeeShop";
import Coffee from "./coffee_shop/CoffeeShop";

export default () => {
  return (
    <React.Fragment>
      <TopBar />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Register} routeType="auth" />
        <Route exact path="/:shopId/coffee-:coffeeId" component={Coffee} />
        <Route exact path="/:shopId" component={CoffeeShop} />
        <Route exact path="/" component={Splash} />
      </Switch>
    </React.Fragment>
  );
};
