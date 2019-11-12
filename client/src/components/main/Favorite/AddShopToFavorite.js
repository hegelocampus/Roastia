import React from "react";
import { Query, Mutation } from "react-apollo";

import Queries from "../../../graphql/queries";
import Mutations from "../../../graphql/mutations";

const { FETCH_CURRENT_USER, FETCH_SHOP, FETCH_FAVORITE_SHOPS } = Queries;
const { ADD_FAVORITE, REMOVE_FAVORITE } = Mutations;

const AddShopToFavorite = props => {
  return (
    <Query query={FETCH_CURRENT_USER}>
      {({ data, loading, error }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const currentUserId = data.fetchCurrentUser._id;

        let userIds = [];
        props.users.forEach(user => {
          userIds.push(user._id);
        });

        if (userIds.includes(currentUserId)) {
          return (
            <Mutation
              mutation={REMOVE_FAVORITE}
              refetchQueries={() => {
                return [
                  { query: FETCH_SHOP, variables: { id: props.shopId } },
                  { query: FETCH_FAVORITE_SHOPS },
                  { query: FETCH_CURRENT_USER }
                ];
              }}
            >
              {removeFavorite => {
                return (
                  <img
                    src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/favorite.png"
                    onClick={() => {
                      removeFavorite({
                        variables: {
                          // userId: currentUserId,
                          coffeeShopId: props.shopId
                        }
                      });
                    }}
                    alt=""
                  />
                );
              }}
            </Mutation>
          );
        } else {
          return (
            <Mutation
              mutation={ADD_FAVORITE}
              refetchQueries={() => {
                return [
                  { query: FETCH_SHOP, variables: { id: props.shopId } },
                  { query: FETCH_FAVORITE_SHOPS },
                  { query: FETCH_CURRENT_USER }
                ];
              }}
            >
              {addFavorite => {
                return (
                  <img
                    src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/unfavorite.png"
                    onClick={() => {
                      addFavorite({
                        variables: {
                          // userId: currentUserId,
                          coffeeShopId: props.shopId
                        }
                      });
                    }}
                    alt=""
                  />
                );
              }}
            </Mutation>
          );
        }
      }}
    </Query>
  );
};

export default AddShopToFavorite;
