import React from 'react';
import CoffeeForm from '../coffee/CoffeeForm';
import './CoffeeFormModal.scss';

export default ({ background }) => {
  const { history, location, modalContent, formType } = useModalHelper();

  const coffee = location.state.coffee || null;

  return (
    <div className="coffee-modal-screen">
      <div className="coffee-modal-content" ref={modalContent}>
        <div className="coffee-modal-body">
          <CoffeeForm coffee={coffee} formType={formType} />
        </div>
      </div>
    </div>
  );
};

