import { useMutation } from '@apollo/react-hooks';

import Queries from '../../../graphql/queries';
import Mutations from '../../../graphql/mutations';
const { FETCH_COFFEE } = Queries;
const { REMOVE_COFFEE_FROM_SHOP } = Mutations;

export default (coffeeId) => {
  const [removeCoffeeFromShop] = useMutation(REMOVE_COFFEE_FROM_SHOP);
  return (shop) => {
    removeCoffeeFromShop({
      variables: { coffeeShopId: shop.id, coffeeId: coffeeId },
      optimisticResponse: {
        __typename: "Mutation",
        removeCoffeeFromShop: {
          id: coffeeId,
          name: shop.name,
          __typename: "Coffee",
          shops: [{
            id: shop.id,
            name: shop.name,
            __typename: "CoffeeShop"
          }]
        }
      },
      update: (proxy, { data: { removeCoffeeFromShop } }) => {
        console.log(removeCoffeeFromShop);
        const data = proxy.readQuery({
          query: FETCH_COFFEE,
          variables: {
            id: coffeeId,
          },
        });
        proxy.writeQuery({ query: FETCH_COFFEE, data: {
          ...data,
          shops: [...data.coffee.shops, addCoffeeToShop.shops]
        }});
      }
    });
  };
}
