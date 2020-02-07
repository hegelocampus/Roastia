import React from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import Queries from '../../../graphql/queries';
import Mutations from '../../../graphql/mutations';
const { FETCH_COFFEE } = Queries;
const { REMOVE_COFFEE_FROM_SHOP } = Mutations;

export default ({ coffeeId, shopId }) => {
  const history = useHistory();
  const [removeCoffeeFromShop] = useMutation(REMOVE_COFFEE_FROM_SHOP, {
    variables: { coffeeShopId: shopId, coffeeId: coffeeId },
    optimisticResponse: {
      __typename: "Mutation",
      removeCoffeeFromShop: {
        id: coffeeId,
        __typename: "Coffee",
        shops: [{
          id: shopId,
          __typename: "CoffeeShop"
        }]
      }
    },
    update: (proxy, { data: { removeCoffeeFromShop } }) => {
      const data = proxy.readQuery({
        query: FETCH_COFFEE,
        variables: {
          id: coffeeId,
        },
      });
      proxy.writeQuery({ query: FETCH_COFFEE, data: {
        ...data,
        shops: [...data.coffee.shops, removeCoffeeFromShop.shops]
      }});
    }
  });

  return (
    <React.Fragment>
      <h1>Are you sure you want to remove this shop from the coffee?</h1>
      <button onClick={ () => {
        removeCoffeeFromShop();
        history.goBack();
      }}>
        Confirm
      </button>
      <button onClick={ () => {
        history.goBack();
      }}>
        Cancel
      </button>

    </React.Fragment>
  )
}
