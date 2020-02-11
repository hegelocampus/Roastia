import React from 'react';
import { Switch } from 'react-router-dom';
import AuthRoute from '../util/route_util';
import Modal from './modal/Modal';

export default ({ background, notice }) => {
  if (!background) return null;
  return (
    <Switch>
      <AuthRoute
        path={['/login', '/signup']}
        routeType="auth"
        notice={notice}
        modalType='auth'
        component={Modal}
        background={background}
      />
      <AuthRoute
        exact
        path={['/shop/:shopId/edit', '/new/shop']}
        component={Modal}
        modalType='shop'
        background={background}
      />
      <AuthRoute
        exact
        path={['/coffee/:coffeeId/edit', '/new/coffee']}
        component={Modal}
        modalType='coffee'
        background={background}
      />
      <AuthRoute
        exact
        path={['/relation/add', '/relation/remove']}
        component={Modal}
        modalType='relation'
        background={background}
      />
    </Switch>
  );
}

