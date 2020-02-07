import React from 'react';
import { Query, Mutation } from 'react-apollo';

import Queries from '../../../graphql/queries';
import Mutations from '../../../graphql/mutations';

import AuthLink from '../../util/AuthLink';

const { FETCH_CURRENT_USER, FETCH_SHOP, FETCH_FAVORITE_SHOPS } = Queries;
const { ADD_FAVORITE, REMOVE_FAVORITE } = Mutations;

const AddShopToFavorite = props => {
  return (
    <Query query={FETCH_CURRENT_USER}>
      {({ data, loading, error }) => {
        if (loading) return 'Loading...';
        if (error)
          return (
            <AuthLink
              to={`/shop/${props.shopId}`}
              notice={true}
              content={
                <img
                  src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/unfavorite.png"
                  alt=""
                />
              }
            ></AuthLink>
          );

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
                  { query: FETCH_CURRENT_USER },
                ];
              }}
            >
              {removeFavorite => {
                return (
                  <AuthLink
                    to={`/shop/${props.shopId}`}
                    notice={true}
                    content={
                      <img
                        src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/favorite.png"
                        onClick={() => {
                          removeFavorite({
                            variables: {
                              coffeeShopId: props.shopId,
                            },
                          });
                        }}
                        alt=""
                      />
                    }
                  ></AuthLink>
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
                  { query: FETCH_CURRENT_USER },
                ];
              }}
            >
              {addFavorite => {
                return (
                  <AuthLink
                    notice={true}
                    to={`/shop/${props.shopId}`}
                    content={
                      <img
                        src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/unfavorite.png"
                        onClick={() => {
                          addFavorite({
                            variables: {
                              coffeeShopId: props.shopId,
                            },
                          });
                        }}
                        alt=""
                      />
                    }
                  ></AuthLink>
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
