import gql from "graphql-tag";

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
    mutation AddFavorite($userId: ID!, $coffeeShopId: ID!) {
      addFavorite(userId: $userId, coffeeShopId: $coffeeShopId) {
        _id
        name
      }
    }
  `,
  REMOVE_FAVORITE: gql`
    mutation RemoveFavorite($userId: ID!, $coffeeShopId: ID!) {
      removeFavorite(userId: $userId, coffeeShopId: $coffeeShopId) {
        _id
        name
      }
    }
  `,
  ADD_SHOP: gql`
    mutation NewCoffeeShop($name: String!, $founded: String, $address: Address, $type: String, $baristaSatisfaction: Int) {
      newCoffeeShop(name: $name, founded: $founded, address: $address, type: $type, baristaSatisfaction: $baristaSatisfaction) {
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
  UPDATE_SHOP: gql`
    mutation UpdateCoffeeShop($id: ID!, $name: String!, $founded: String, $address: Address, $type: String, $baristaSatisfaction: Int) {
      updateCoffeeShop(id: $id, name: $name, founded: $founded, address: $address, type: $type, baristaSatisfaction: $baristaSatisfaction) {
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
      }
    }
  `
};

