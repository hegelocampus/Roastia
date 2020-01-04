import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import { CoffeeCupIcon } from '../util/icons';
import './search.scss';

import Queries from '../../graphql/queries';
const { SEARCH_SHOPS } = Queries;


const getSuggestionValue = suggestedShop => suggestedShop.name;

const renderSuggestion = suggestion => (
  <div className="home-search">
    {suggestion.founded && (
      <div className="suggestion">
        <span>{suggestion.name}</span>
        <span>
          {suggestion.address.city +
            ', ' +
            suggestion.address.state +
            ' ' +
            suggestion.address.zip}
        </span>
      </div>
    )}
    {suggestion.origin && (
      <div className="suggestion">
        <span>{suggestion.name}</span>
        <span>Origin: {suggestion.origin}</span>
      </div>
    )}
  </div>
);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      filter: '',
      suggestions: [],
    };
  }

  onChange = (event, { newValue, method }) => {
    if (method === 'click') {
      this._executeSearch();
    } else {
      this.setState({
        filter: newValue,
      });
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    if (!value) {
      this.setState({ suggestions: [] });
      return;
    }
    try {
      this.props.client
        .query({
          query: SEARCH_SHOPS,
          variables: { filter: value },
        })
        .then(result => {
          const coffeeShops = result.data.searchShops;
          let coffees = [];
          coffeeShops.forEach(shop => {
            coffees = coffees
              .concat(shop.coffees)
              .filter(
                coffee =>
                  coffee.name.toLowerCase().includes(value.toLowerCase()) ||
                  coffee.origin.toLowerCase().includes(value.toLowerCase())
              );
          });
          const uniqueCoffees = [...new Set(coffees)]
          const suggestions = [
            {
              title: 'Coffee Shops',
              shopSuggestions: coffeeShops,
            },
            {
              title: 'Coffee',
              shopSuggestions: Array.from(uniqueCoffees),
            },
          ];
          this.setState({ suggestions: suggestions });
        });
    } catch (e) {
      this.setState({ suggestions: [] });
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  renderSectionTitle = section => {
    return (
      section.shopSuggestions.length > 0 && <strong>{section.title}</strong>
    );
  };

  getSectionSuggestions = section => {
    return section.shopSuggestions;
  };

  render() {
    const { filter, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Enter a city, state, name or origin...',
      value: filter,
      onChange: this.onChange,
      autoComplete: 'off',
    };

    return (
      <div>
        <div>
          <form
            className="search-bar-container"
            onSubmit={e => this._executeSearch(e)}
          >
            <div>
              <Autosuggest
                getSuggestionValue={getSuggestionValue}
                inputProps={inputProps}
                multiSection={true}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                renderSectionTitle={this.renderSectionTitle}
                getSectionSuggestions={this.getSectionSuggestions}
                renderSuggestion={renderSuggestion}
                suggestions={suggestions}
              />
            </div>
            <button type="submit">
              <CoffeeCupIcon />
            </button>
          </form>
        </div>
      </div>
    );
  }

  _executeSearch = async e => {
    if (e) e.preventDefault();
    const { filter } = this.state;
    const result = await this.props.client.query({
      query: SEARCH_SHOPS,
      variables: { filter },
    });
    const coffeeShops = result.data.searchShops;
    this.setState({ shops: coffeeShops });
    this.props.history.push({
      pathname: './shops',
      state: { coffeeShops: coffeeShops },
      search: `?filter=${filter}`
    });
  };
}

export default withRouter(withApollo(Search));
