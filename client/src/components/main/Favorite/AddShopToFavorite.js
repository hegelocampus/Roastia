import React from "react";
import { Query, Mutation, ApolloConsumer } from "react-apollo";

import Queries from "../../../graphql/queries";
import Mutations from "../../../graphql/mutations";

const { CURRENT_USER, FETCH_SHOP } = Queries;
const { ADD_FAVORITE, REMOVE_FAVORITE } = Mutations;

const AddShopToFavorite = props => {
  return (
    <ApolloConsumer>
      {client => (
        <Query query={CURRENT_USER}>
          {({ data }) => {
            const currentUserId = data.id;
            if (!props.users) return null;

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
                      { query: FETCH_SHOP, variables: { id: props.shopId } }
                    ];
                  }}
                >
                  {removeFavorite => {
                    return (
                      <img
                        src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/unfavorite.png"
                        onClick={() => {
                          removeFavorite({
                            variables: {
                              userId: currentUserId,
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
                      { query: FETCH_SHOP, variables: { id: props.shopId } }
                    ];
                  }}
                >
                  {addFavorite => {
                    return (
                      <img
                        src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/favorite.png"
                        onClick={() => {
                          addFavorite({
                            variables: {
                              userId: currentUserId,
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
      )}
    </ApolloConsumer>
  );
};

export default AddShopToFavorite;
