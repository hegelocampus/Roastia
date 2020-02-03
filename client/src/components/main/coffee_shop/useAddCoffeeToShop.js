import { useMutation, useApolloClient } from '@apollo/react-hooks';

import Queries from '../../../graphql/queries';
import Mutations from '../../../graphql/mutations';
const { FETCH_SHOP, FETCH_COFFEE  } = Queries;
const { ADD_COFFEE_TO_SHOP } = Mutations;

export default (shop) => {
  const client = useApolloClient();
  const [addCoffee] = useMutation(ADD_COFFEE_TO_SHOP);

  return (coffeeId) => {
    client.query({
      query: FETCH_COFFEE,
      variables: { id: coffeeId },
    }).then(({ data }) => {
      console.log(data);
      addCoffee({
        variables: { coffeeShopId: shop.id, coffeeId: coffeeId },
        optimisticResponse: {
          __typename: "Mutation",
          addCoffeeToShop: {
            id: shop.id,
            name: shop.name,
            __typename: "CoffeeShop",
            coffees: [ ...shop.coffees, {
              id: coffeeId,
              __typename: "Coffee",
            }]
          }
        },
        update: (cache, { data: { addCoffeeToShop } }) => {
          console.log(addCoffeeToShop);
          const oldData = cache.readQuery({
            query: FETCH_SHOP,
            variables: {
              id: shop.id,
            },
          });
          console.log(oldData);
          cache.writeQuery({ query: FETCH_SHOP, data: { coffeeShop: {
            ...oldData.coffeeShop,
            ...addCoffeeToShop
          }}});
        }
      })
    });
  }
}

