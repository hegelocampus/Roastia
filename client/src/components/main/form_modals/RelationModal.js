import React, { useRef } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import RemoveRelationForm from '../coffee/RemoveRelationForm';
import useOnOutsideClick from '../../util/useOnOutsideClick';
import './ShopFormModal.scss';

export default ({ background }) => {
  const history = useHistory();
  const location = useLocation();
  const formType = location.pathname.match(/([^/]+)\/?$/)[0];
  const coffeeId = location.state.coffeeId;
  const shopId = location.state.shopId;

  if (!(coffeeId && shopId)) {
    return <Redirect to="/" />;
  }

  const modalContent = useRef(null);
  useOnOutsideClick(modalContent, e => {
    e.stopPropagation();
    history.goBack();
  });

  return (
    <div className="modal-screen">
      <div className="modal-content" ref={modalContent}>
        <div className="modal-body">
          <RemoveRelationForm
            shopId={shopId}
            coffeeId={coffeeId}
            formType={formType}
          />
        </div>
      </div>
    </div>
  );
};

