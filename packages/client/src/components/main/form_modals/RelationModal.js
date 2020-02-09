import React from 'react';
import { Redirect } from 'react-router-dom';
import RemoveRelationForm from '../coffee/RemoveRelationForm';
import useModalHelper from './useModalHelper';
import './ShopFormModal.scss';

export default ({ background }) => {
  const { history, location, modalContent, formType } = useModalHelper();

  const coffeeId = location.state.coffeeId;
  const shopId = location.state.shopId;
  if (!(coffeeId && shopId)) {
    return <Redirect to="/" />;
  }

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

