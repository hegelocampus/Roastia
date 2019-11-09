import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_SHOP: gql`
    query coffeeShop($id: ID!) {
      coffeeShop(id: $id) {
        _id
        name
        address
        founded
        type
        baristaSatisfaction
        coffees {
          _id
          name
        }
      }
    }
  `
};
