import React from "react";
import { Switch, Route } from "react-router-dom";
import TopBar from "./top_bar/TopBar";
import Splash from "./Splash";
import CoffeeShop from "./coffee_shop/CoffeeShop";
import CoffeeShopIndex from "./coffee_shop/CoffeeShopIndex";
import Coffee from "./coffee_shop/CoffeeShop";

export default () => {
  return (
    <React.Fragment>
      <TopBar />
      <Switch>
        <Route path="/shops" component={CoffeeShopIndex} />
        <Route path="/:shopId/coffee-:coffeeId" component={Coffee} />
        <Route path="/:shopId" component={CoffeeShop} />
        <Route exact path="/" component={Splash} />
      </Switch>
    </React.Fragment>
  );
};
