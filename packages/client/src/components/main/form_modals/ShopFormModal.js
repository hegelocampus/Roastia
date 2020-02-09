import React from 'react';
import styled from 'styled-components';
import CoffeeForm from '../coffee/CoffeeForm';
import CoffeeShopForm from '../coffee_shop/CoffeeShopForm';
import useModalHelper from './useModalHelper';
import './ShopFormModal.scss';

const ModalScreen = styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  min-height: 100%;
  background-color: rgba(26, 33, 39, 0.65);
  z-index: 1000;
`
const ModalContent = styled.div`
  background-color: #ffffff;
  margin: auto;
  overflow: auto;
  margin-top: 35px;
  display: block;
  position: relative;
  width: 85%;
  height: auto;
  max-height: 90%;
  div {
    margin: auto;
    width: 80%;
  }
`

export default ({ background, modalType }) => {
  const { history, location, modalContent, formType } = useModalHelper();

  return (
    <ModalScreen>
      <ModalContent ref={modalContent}>
        <div>
          {modalType === 'shop' ? (
            <CoffeeShopForm shop={location.state.shop || null} formType={formType} />
          ) : (
            <CoffeeForm coffee={location.state.coffee || null} formType={formType} />
          )}
        </div>
      </ModalContent >
    </ModalScreen>
  );
};
