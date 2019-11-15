import React, { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CoffeeShopForm from "../coffee_shop/CoffeeShopForm";
import useOnOutsideClick from '../../util/useOnOutsideClick';
import './ShopFormModal.scss';

export default ({ background })=> {
  const history = useHistory();
  const location = useLocation();
  const formType = location.pathname.match(/([^/]+)\/?$/)[0];
  const shop = location.state.shop;

  const modalContent = useRef(null);
  useOnOutsideClick(modalContent, e => {
    e.stopPropagation();
    history.goBack();
  });

  return (
    <div className="modal-screen" >
      <div className="modal-content" ref={ modalContent }>
        <div className="modal-body">
          <CoffeeShopForm shop={ shop } formType={ formType } />
        </div>
      </div>
    </div>
  );
};

