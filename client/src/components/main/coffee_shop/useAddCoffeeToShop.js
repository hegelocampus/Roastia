import { useMutation } from '@apollo/react-hooks';

import Queries from '../../../graphql/queries';
import Mutations from '../../../graphql/mutations';
const { FETCH_COFFEE } = Queries;
const { ADD_COFFEE_TO_SHOP } = Mutations;

export default (shop) => {
  const [addCoffeeToShop] = useMutation(ADD_COFFEE_TO_SHOP);
  return (coffee) => {
    addCoffeeToShop({
      variables: { coffeeShopId: shopId, coffeeId: coffee.id },
      optimisticResponse: {
        __typename: "Mutation",
        addCoffeeToShop: {
          id: coffeeId,
          name: coffee.name,
          __typename: "Coffee",
          shops: [{
            id: shop.id,
            name: shop.name,
            address: shop.address,
            __typename: "CoffeeShop"
          }]
        }
      },
      update: (proxy, { data } }) => {
        const data = proxy.readQuery({
          query: FETCH_COFFEE,
          variables: {
            id: coffeeId,
          },
        });
        proxy.writeQuery({ query: FETCH_SHOP, data: {
          ...data,
          coffees: [...data.shop.coffees, data.addCoffeeToShop.shops]
        }});
      }
    });
  };
}

