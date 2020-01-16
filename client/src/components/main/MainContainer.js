import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import TopBar from './top_bar/TopBar';
import Splash from './splash/Splash';
import CoffeeShop from './coffee_shop/CoffeeShop';
import CoffeeShopIndex from './coffee_shop/CoffeeShopIndex';
import Coffee from './coffee/Coffee';
import AuthRoute from '../util/route_util';
import ModalSwitch from './ModalSwitch';
import FavoriteShops from './favorite/FavoriteShops';
import CoffeeForm from './coffee/CoffeeForm';
import CoffeeShopForm from './coffee_shop/CoffeeShopForm';
const MainContainer = styled.main`
  min-height: 100%;
  width: 100%;
  background-color: #faefe4;
`;

export default () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const notice = location.state && location.state.notice;

  return (
    <React.Fragment>
      <TopBar />
      <MainContainer>
        <Switch location={background || location}>
          <AuthRoute exact path="/favorites" component={FavoriteShops} />
          <Route path="/shops" component={CoffeeShopIndex} />
          <Route path="/shop/:shopId/edit" component={CoffeeShopForm} />
          <Route path="/coffee/:coffeeId/edit" component={CoffeeForm} />
          <Route path="/coffee/:coffeeId" component={Coffee} />
          <Route path="/shop/:shopId" component={CoffeeShop} />
          <AuthRoute path="/new/shop" component={CoffeeShopForm} />
          <AuthRoute path="/new/coffee" component={CoffeeForm} />
          <Route exact path="/" component={Splash} />
        </Switch>
      </MainContainer>
      {<ModalSwitch background={background} notice={notice} />}
    </React.Fragment>
  );
}

