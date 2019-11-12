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
  `
};
