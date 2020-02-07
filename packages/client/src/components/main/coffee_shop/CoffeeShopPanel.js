import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

import toTitleCase from '../../util/toTitleCase';
import ShopPanelCoffees from './ShopPanelCoffees';

const ShopIndexItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  padding: 10px 10px 10px 10px;
  position: relative;
  width: 100%;
  top: 0;
  transition: top ease 0.5s;
  transition: ease-out 0.5s;
  @media only screen and (max-width: 1200px) {
    max-width: 100%;
  }
  h4 {
    margin: 5px 0;
  }
`;

const ShopLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const PanelDetail = styled.div`
  font-size: 14px;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  width: 45%;
  p {
    line-height: 1.1em;
  }
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
`;

const ShopPanelImage = styled.img`
  display: border-box;
  margin-right: 10px;
  height: 200px;
  width: 280px;
  object-fit: cover;
  border-radius: 5px;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

export default ({ shop: { id, imageURL, name, type, address, coffees }, extraContent }) => {
  const shopType = type ? toTitleCase(type) : "";

  return (
    <ShopIndexItem >
      <ShopLink to={`/shop/${id}`}>
        <ShopPanelImage
          src={imageURL}
          alt={`profile of ${ name }`}
        />
        <PanelDetail>
          <PanelHeader>
            <h4>{name}</h4>
            <span>{shopType}</span>
            <span>
              {`${address.city}, ${address.state} ${address.zip}`}
            </span>
          </PanelHeader>
          <ShopPanelCoffees coffees={coffees} />
        </PanelDetail>
      </ShopLink>
      {extraContent ? extraContent : null}
    </ShopIndexItem>
  );
};

