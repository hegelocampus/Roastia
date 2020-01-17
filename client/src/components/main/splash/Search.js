import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import { CoffeeCupIcon } from '../../util/icons';
import SearchSuggestion from './SearchSuggestion';
import './search.scss';

import Queries from '../../../graphql/queries';
const { SEARCH_SHOPS } = Queries;


const getSuggestionValue = suggestedShop => suggestedShop.name;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      filter: '',
      suggestions: [],
    };
  }

  queryShops = async (filter) => {
    const { data: { searchShops } } = await this.props.client.query({
      query: SEARCH_SHOPS,
      variables: { filter },
    });
    return searchShops;
  }

  onChange = (event, { newValue, method }) => {
    if (method === 'enter') {
        this._executeSearch();
    } else {
      this.setState({
        filter: newValue,
      });
    }
  };

  onSuggestionsFetchRequested = async ({ value }) => {
    if (!value) {
      this.setState({ suggestions: [] });
      return;
    }
    try {
      const shops = await this.queryShops(value);
      let coffees = [];
      await shops.forEach(shop => {
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
          shopSuggestions: shops,
        },
        {
          title: 'Coffee',
          shopSuggestions: uniqueCoffees,
        },
      ];
      this.setState({ suggestions });
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
            onSuggestionSelected={this.onClick}
            renderSectionTitle={this.renderSectionTitle}
            getSectionSuggestions={this.getSectionSuggestions}
            renderSuggestion={(suggestion) =>
              <SearchSuggestion suggestion={suggestion} />
            }
            suggestions={suggestions}
          />
        </div>
        <button type="submit">
          <CoffeeCupIcon />
        </button>
      </form>
    );
  }

  async _executeSearch(e) {
    if (e) e.preventDefault();

    const { filter } = this.state;
    const { history } = this.props;
    const { data: searchShops } = this.queryShops(filter);

    history.push({
      pathname: './shops',
      state: { coffeeShops: searchShops},
      search: `?filter=${filter}`
    });
  };
}

export default withRouter(withApollo(Search));

