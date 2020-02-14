import gql from 'graphql-tag';

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
        __typename
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
          __typename
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
        __typename
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
        __typename
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
          __typename
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
        __typename
        shops {
          id
          name
          imageURL
          __typename
          coffees {
            id
            name
            origin
            flavor
            processing
            __typename
          }
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
        __typename
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
  `,
  FETCH_SHOP_COFFEES: gql`
    query FetchShopCoffees($shopId: ID, $filter: FilterInputType) {
      fetchShopCoffees(shopId: $shopId, filter: $filter) {
        id
        name
        origin
        price
        __typename
      }
    }
  `,
};
