import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import TopBar from './top_bar/TopBar';
import Splash from './Splash';
import CoffeeShop from './coffee_shop/CoffeeShop';
import CoffeeShopIndex from './coffee_shop/CoffeeShopIndex';
import Coffee from './coffee/Coffee';
import AuthRoute from '../util/route_util';
import Modal from './auth_modal/AuthModal';
import FavoriteShops from './favorite/FavoriteShops';
import CoffeeForm from './coffee/CoffeeForm';
import CoffeeShopForm from './coffee_shop/CoffeeShopForm';
import CoffeeFormModal  from './form_modals/CoffeeFormModal';
import ShopFormModal from './form_modals/ShopFormModal';
import RelationModal from './form_modals/RelationModal';
import './MainContainer.scss';

export default () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const notice = location.state && location.state.notice;

  return (
    <React.Fragment>
      <TopBar />
      <main className="main-container">
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
      </main>
      {background && (
        <Switch>
          <AuthRoute
            path={['/login', '/signup']}
            routeType="auth"
            notice={notice}
            component={Modal}
            background={background}
          />
          <AuthRoute
            exact
            path={['/shop/:shopId/edit', '/new/shop']}
            component={ShopFormModal}
            background={background}
          />
          <AuthRoute
            exact
            path={['/coffee/:coffeeId/edit', '/new/coffee']}
            component={CoffeeFormModal}
            background={background}
          />
          <AuthRoute
            exact
            path={['/relation/add', '/relation/remove']}
            component={RelationModal}
            background={background}
          />
        </Switch>
      )}
    </React.Fragment>
  );
}
