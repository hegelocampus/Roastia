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
        id
        name
        founded
        type
        baristaSatisfaction
        address {
          city
          state
          street
          zip
        }
        coffees {
          id
          name
        }
      }
    }
  `,
  FETCH_SHOPS: gql`
    query coffeeShops($selectors: Selectors) {
      coffeeShops(selectors: $selectors) {
        id
        type
        name
        address {
          city
          state
          street
          zip
        }
      }
    }
  `
};
