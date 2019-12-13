import React, { useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import CoffeeShopForm from '../coffee_shop/CoffeeShopForm';
import useOnOutsideClick from '../../util/useOnOutsideClick';
import usePreventScrollWhenOpen from '../../util/usePreventScrollWhenOpen';
import './ShopFormModal.scss';

export default ({ background }) => {
  const history = useHistory();
  const location = useLocation();
  const formType = location.pathname.match(/([^/]+)\/?$/)[0];
  const shop = location.state.shop || null;

  usePreventScrollWhenOpen();

  const modalContent = useRef(null);
  useOnOutsideClick(modalContent, e => {
    e.stopPropagation();
    history.goBack();
  });

  return (
    <div className="shop-modal-screen">
      <div className="shop-modal-content" ref={modalContent}>
        <div className="shop-modal-body">
          <CoffeeShopForm shop={shop} formType={formType} />
        </div>
      </div>
    </div>
  );
};
