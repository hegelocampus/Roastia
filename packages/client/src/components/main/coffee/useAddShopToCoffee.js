import { useMutation } from '@apollo/react-hooks';

import Queries from '../../../graphql/queries';
import Mutations from '../../../graphql/mutations';
const { FETCH_COFFEE } = Queries;
const { ADD_COFFEE_TO_SHOP } = Mutations;

export default (coffeeId) => {
  const [addCoffeeToShop] = useMutation(ADD_COFFEE_TO_SHOP);
  return (shop) => {
    addCoffeeToShop({
      variables: { coffeeShopId: shop.id, coffeeId: coffeeId },
      optimisticResponse: {
        __typename: "Mutation",
        addCoffeeToShop: {
          id: coffeeId,
          name: shop.name,
          __typename: "Coffee",
          shops: [{
            id: shop.id,
            name: shop.name,
            address: shop.address,
            __typename: "CoffeeShop"
          }]
        }
      },
      update: (proxy, { data: { addCoffeeToShop } }) => {
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

