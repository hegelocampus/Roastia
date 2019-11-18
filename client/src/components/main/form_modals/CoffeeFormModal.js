import React, { useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import CoffeeForm from '../coffee/CoffeeForm';
import useOnOutsideClick from '../../util/useOnOutsideClick';
import './CoffeeFormModal.scss';

export default ({ background }) => {
  const history = useHistory();
  const location = useLocation();
  const formType = location.pathname.match(/([^/]+)\/?$/)[0];
  const coffee = location.state.coffee || null;

  const modalContent = useRef(null);
  useOnOutsideClick(modalContent, e => {
    e.stopPropagation();
    history.goBack();
  });

  return (
    <div className="modal-screen">
      <div className="modal-content" ref={modalContent}>
        <div className="modal-body">
          <CoffeeForm coffee={coffee} formType={formType} />
        </div>
      </div>
    </div>
  );
};

