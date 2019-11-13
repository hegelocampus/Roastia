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
        description
        url
        imageURL
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
          origin
          processing
        }
        users {
          _id
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
  `,
  SEARCH_SHOPS: gql`
    query searchShops($filter: String!) {
      searchShops(filter: $filter) {
        id
        name
        description
        url
        imageURL
        founded
        address {
          street
          city
          state
          zip
        }
        type
        baristaSatisfaction
        coffees {
          id
          name
          origin
          roasting
          flavor
          processing
        }
      }
    }
  `,
  FETCH_COFFEE: gql`
    query coffee($id: ID!) {
      coffee(id: $id) {
        id
        name
        origin
        processing
        roasting
        flavor
        price
        shops {
          id
          name
          address {
            city
            state
            zip
          }
        }
      }
    }
  `,
  FETCH_FAVORITE_SHOPS: gql`
    query FetchFavoriteShops {
      fetchFavoriteShops {
        id
        name
        description
        url
        imageURL
        founded
        address {
          street
          city
          state
          zip
        }
        type
        baristaSatisfaction
        coffees {
          id
          name
        }
      }
    }
  `,
  FETCH_CURRENT_USER: gql`
    query FetchCurrentUser {
      fetchCurrentUser {
        _id
      }
    }
  `
};
