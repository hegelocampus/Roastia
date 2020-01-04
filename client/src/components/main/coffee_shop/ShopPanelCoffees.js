import React from 'react';
import styled from 'styled-components';
import { BeanIcon, OriginIcon, FlavorIcon } from '../../util/icons';

const PanelCoffee = styled.div`
  margin-top: 15px;
`;

const CoffeeAttributes = styled.div`
  display: grid;
  grid-template: 1fr 1fr 1fr / 25px 1fr;
  grid-column-gap: 10px;
  align-items: center;
`;

const CoffeeSubtitle = styled.span`
  font-weight: 600;
  color: #515151;
  margin-bottom: ;
  margin: 2px 0 10px 0;
  display: inline-block;
`;

export default ({coffees = []}) => {
  const randomCoffee = () => coffees[Math.floor(Math.random() * coffees.length)];
  return (
    <PanelCoffee>
      <CoffeeSubtitle>COFFEE</CoffeeSubtitle>

      <CoffeeAttributes>
        <BeanIcon />
        <p>
          {coffees && coffees.length >= 1
            ? "Process: " + randomCoffee().processing
            : "This shop has no coffee!"}
        </p>
        <OriginIcon />
        <p>
          {coffees && coffees.length >= 1
            ? "Origin: " + randomCoffee().origin
            : "No origin listed"}
        </p>
        <FlavorIcon />
        <p>
          {coffees && coffees.length >= 1
            ? "Flavors: " + randomCoffee().flavor.slice(0, 2).join(", ")
            : "No flavors listed"}
        </p>
      </CoffeeAttributes>
    </PanelCoffee>
  );
}

