import React from 'react';
import styled from 'styled-components';
import CoffeeForm from '../coffee/CoffeeForm';
import CoffeeShopForm from '../coffee_shop/CoffeeShopForm';
import useModalHelper from './useModalHelper';
import AuthWrapper from '../auth/AuthWrapper.js';
import RemoveRelationForm from '../coffee/RemoveRelationForm';

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
  margin-top: 35px;
  padding: 10px 10px 30px 10px;
  display: block;
  position: relative;
  width: 85%;
  height: auto;
  overflow: auto;
  div {
    margin: auto;
    width: 80%;
  }
`

export default ({ modalType, background }) => {
  const { location, modalContent, formType } = useModalHelper();

  return (
    <ModalScreen>
      <ModalContent ref={modalContent}>
        <div>
          {{
            'shop': (
              <CoffeeShopForm
                shop={location.state.shop || null}
                formType={formType}
              />
            ),
            'coffee': (
              <CoffeeForm
                coffee={location.state.coffee || null}
                formType={formType}
              />
            ),
            'relation': (
              <RemoveRelationForm
                shopId={location.state.shopId || null}
                coffeeId={location.state.coffeeId || null}
                formType={formType}
              />
            ),
            'auth': (
              <AuthWrapper background={ background }/>
            )
          }[modalType]}
        </div>
      </ModalContent >
    </ModalScreen>
  );
};
