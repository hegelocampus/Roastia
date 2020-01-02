import { useMutation } from '@apollo/react-hooks';

import Queries from '../../../graphql/queries';
import Mutations from '../../../graphql/mutations';
const { FETCH_SHOP } = Queries;
const { ADD_COFFEE_TO_SHOP } = Mutations;

export default (shop) => {
  const [addCoffeeToShop] = useMutation(ADD_COFFEE_TO_SHOP);
  return (coffeeId) => {
    console.log(`coffee: ${coffeeId}`,`shop: ${shop.id}`);
    addCoffeeToShop({
      variables: { coffeeShopId: shop.id, coffeeId: coffeeId },
      optimisticResponse: {
        __typename: "Mutation",
        addCoffeeToShop: {
          id: coffeeId,
          __typename: "Coffee",
          shops: [{
            id: shop.id,
            __typename: "CoffeeShop"
          }]
        }
      },
      update: (proxy, { data }) => {
        const oldData = proxy.readQuery({
          query: FETCH_SHOP,
          variables: {
            id: shop.id,
            name: shop.name,
            __typename: "CoffeeShop"
          },
        });
        console.log(oldData);
        console.log(data);
        proxy.writeQuery({ query: FETCH_SHOP, data: {
          ...data,
          coffees: [...oldData.coffeeShop.coffees, data.addCoffeeToShop]
        }});
      }
    });
  };
}

