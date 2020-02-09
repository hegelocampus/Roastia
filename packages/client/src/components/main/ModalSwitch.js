import React from 'react';
import { Switch } from 'react-router-dom';
import AuthRoute from '../util/route_util';
import AuthModal from './auth_modal/AuthModal';
import ShopFormModal from './form_modals/ShopFormModal';
import RelationModal from './form_modals/RelationModal';

export default ({ background, notice }) => {
  if (!background) return null;
  return (
    <Switch>
      <AuthRoute
        path={['/login', '/signup']}
        routeType="auth"
        notice={notice}
        component={AuthModal}
        background={background}
      />
      <AuthRoute
        exact
        path={['/shop/:shopId/edit', '/new/shop']}
        component={ShopFormModal}
        type={'shop'}
        background={background}
      />
      <AuthRoute
        exact
        path={['/coffee/:coffeeId/edit', '/new/coffee']}
        component={ShopFormModal}
        type={'coffee'}
        background={background}
      />
      <AuthRoute
        exact
        path={['/relation/add', '/relation/remove']}
        component={RelationModal}
        background={background}
      />
    </Switch>
  );
}

