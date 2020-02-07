import gql from 'graphql-tag';

export default {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
        token
        loggedIn
      }
    }
  `,
  ADD_FAVORITE: gql`
    mutation AddFavorite($coffeeShopId: ID!) {
      addFavorite(coffeeShopId: $coffeeShopId) {
        _id
        name
      }
    }
  `,
  REMOVE_FAVORITE: gql`
    mutation RemoveFavorite($coffeeShopId: ID!) {
      removeFavorite(coffeeShopId: $coffeeShopId) {
        _id
        name
      }
    }
  `,
  ADD_SHOP: gql`
    mutation NewCoffeeShop(
      $name: String!
      $url: String!
      $imageURL: String!
      $description: String!
      $founded: String!
      $address: Address!
      $type: String!
      $baristaSatisfaction: Int!
    ) {
      newCoffeeShop(
        name: $name
        url: $url
        imageURL: $imageURL
        description: $description
        founded: $founded
        address: $address
        type: $type
        baristaSatisfaction: $baristaSatisfaction
      ) {
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
  UPDATE_SHOP: gql`
    mutation UpdateCoffeeShop(
      $id: ID!
      $name: String!
      $url: String!
      $imageURL: String!
      $description: String!
      $founded: String!
      $address: Address!
      $type: String!
      $baristaSatisfaction: Int!
    ) {
      updateCoffeeShop(
        id: $id
        name: $name
        url: $url
        imageURL: $imageURL
        description: $description
        founded: $founded
        address: $address
        type: $type
        baristaSatisfaction: $baristaSatisfaction
      ) {
        id
        name
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
      }
    }
  `,
  ADD_COFFEE: gql`
    mutation AddCoffee(
      $name: String!
      $origin: String!
      $processing: String!
      $roasting: String!
      $flavor: [String]
      $price: Int!
    ) {
      addCoffee(
        name: $name
        origin: $origin
        processing: $processing
        roasting: $roasting
        flavor: $flavor
        price: $price
      ) {
        id
        __typename
        name
        origin
        processing
        roasting
        flavor
        price
      }
    }
  `,
  ADD_COFFEE_TO_SHOP: gql`
    mutation AddCoffeeToShop(
      $coffeeId: ID!
      $coffeeShopId: ID!
    ) {
      addCoffeeToShop(
        coffeeId: $coffeeId
        coffeeShopId: $coffeeShopId
      ) {
        id
        __typename
        shops {
          id
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
    }
  `,
  REMOVE_COFFEE_FROM_SHOP: gql`
    mutation RemoveCoffeeFromShop(
      $coffeeId: ID!
      $coffeeShopId: ID!
    ) {
      removeCoffeeFromShop(
        coffeeId: $coffeeId
        coffeeShopId: $coffeeShopId
      ) {
        id
        name
        __typename
        shops {
          id
          name
          __typename
        }
      }
    }
  `,
};

