import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import TopBar from "./top_bar/TopBar";
import Splash from "./Splash";
import CoffeeShop from "./coffee_shop/CoffeeShop";
import CoffeeShopIndex from "./coffee_shop/CoffeeShopIndex";
import Coffee from "./coffee/Coffee";
import AuthRoute from '../util/route_util';
import Modal from './auth_modal/AuthModal';
import FavoriteShops from "./Favorite/FavoriteShops";

export default () => {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <React.Fragment>
      <TopBar />
      <Switch location={ background || location }>
        <AuthRoute exact path="/favorites" component={FavoriteShops} />
        <Route path="/shops" component={CoffeeShopIndex} />
        <Route path="/shop/:shopId/coffee-:coffeeId" component={Coffee} />
        <Route path="/shop/:shopId" component={CoffeeShop} />
        <Route exact path="/" component={Splash} />
      </Switch>
      {background && (
        <AuthRoute
          path={ ["/login", "/signup"] }
          routeType="auth"
          component={ Modal }
          background={ background }
        />
      )}
    </React.Fragment>
  );
};
