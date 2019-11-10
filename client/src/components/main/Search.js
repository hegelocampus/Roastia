import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Queries from "../../graphql/queries";
const { SEARCH_SHOPS } = Queries;

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shops: [],
      filter: '',
      referrer: null
    }
  }

  render() {
    return (
      <div>
        <div>
          Search
            <input
              type='text'
              onChange={e => this.setState({ filter: e.target.value })}
            />
            <button onClick={() => this._executeSearch()}>
              Find a shop!
            </button>
        </div>
      </div>
    )
  }

  _executeSearch = async () => {
    const { filter } = this.state
    const result = await this.props.client.query({
      query: SEARCH_SHOPS,
      variables: { filter },
    })
    const coffeeShops = result.data.searchShops;
    this.setState({ shops: coffeeShops, referrer: './shops' });
    const { referrer } = this.state;
    this.props.history.push({
      pathname: referrer,
      state: { coffeeShops: coffeeShops }
    });
  }
}

export default withRouter(withApollo(Search));