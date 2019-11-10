import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
// import CoffeeShop from './CoffeeShop';
// import Coffee from './Coffee';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      coffeeShops {
        id
        name
        founded
        address {
          street
          city
          state
          zip
        }
        type
        baristaSatisfaction
      }
    }
  }
`

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shops: [],
      filter: ''
    }
  }

  render() {
    return (
      <div>
        <div>
          Search
          <form>
            <input
              type='text'
              onChange={e => this.setState({ filter: e.target.value })}
            />
            <button onClick={() => this._executeSearch()}>
              OK
            </button>
          </form>
        </div>
        {/* Uncomment when component is built */}
        {/* {this.state.shops.map((shop, idx) => (
          <CoffeeShop key={shop.id} shop={shop} index={idx} />
        ))} */}
      </div>
    )
  }

  _executeSearch = async () => {

  }
}

export default withApollo(Search);