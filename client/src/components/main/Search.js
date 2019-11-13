import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import Queries from "../../graphql/queries";
const { SEARCH_SHOPS } = Queries;

const getSuggestions = (filter, shops) => {
  const inputValue = filter.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : shops.filter(
        shop =>
          shop.name.toLowerCase().slice(0, inputLength) === inputValue ||
          shop.address.state.toLowerCase().slice(0, inputLength) ===
            inputValue ||
          shop.address.city.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = suggestedShop => suggestedShop.name;

const renderSuggestion = suggestedShop => (
  <div className="home-search">{suggestedShop.name}</div>
);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      filter: "",
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      filter: newValue
    });
  };

  onSuggestionsFetchRequested = async ({ value }) => {
    if (!value) {
      this.setState({ suggestions: [] });
      return;
    }
    try {
      const { filter } = this.state;
      const result = await this.props.client.query({
        query: SEARCH_SHOPS,
        variables: { filter }
      });
      const coffeeShops = result.data.searchShops;
      this.setState({ suggestions: getSuggestions(value, coffeeShops) });
    } catch (e) {
      this.setState({ suggestions: [] });
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { filter, suggestions } = this.state;

    const inputProps = {
      placeholder: "Enter a city, state or name...",
      value: filter,
      onChange: this.onChange,
      autoComplete: "off"
    };

    return (
      <div>
        <div>
          <form
            className="search-bar-container"
            onSubmit={e => this._executeSearch(e)}
          >
            {/* <input
              type="text"
              className="home-search"
              placeholder="Enter a city, state or name..."
              onChange={e => this.setState({ filter: e.target.value })}
            />
          */}
            <div className="home-search">
              <Autosuggest
                inputProps={inputProps}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
              />
            </div>
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.47 36.58">
                <title>barista-icons_espresso-doppio</title>
                <path
                  d="M35.35,17.1H33.76c.24-1.45.38-2.7.48-3.66a1.92,1.92,0,0,0-1.93-2.12H3.7a2,2,0,0,0-1.93,2.12C2.4,19.77,5.31,38.29,18,38.29c6.94,0,10.94-5.51,13.27-11.56h2.15s2.41,0,2.89-1.44L38.24,21C38.24,18.93,37.22,17.1,35.35,17.1ZM24.53,33.86A9.45,9.45,0,0,1,18,36.37a9.45,9.45,0,0,1-6.52-2.51,18.86,18.86,0,0,1-4.36-6.38A49,49,0,0,1,3.7,13.27H32.31A50,50,0,0,1,28.89,27.5,19,19,0,0,1,24.53,33.86Zm10-9.34a.07.07,0,0,1,0,0,2.77,2.77,0,0,1-1.11.24h-.84L34.16,19h1.19c.6,0,.86.85.93,1.57Z"
                  transform="translate(-1.76 -1.71)"
                />
                <path
                  d="M15.11,7a.34.34,0,0,0,0,.17c0,.12,0,.24,0,.36s.09.41.14.6a6.16,6.16,0,0,0,.34.85c.05.09.09.17.12.21a.26.26,0,0,0,.05.08.25.25,0,0,0,.24.12.26.26,0,0,0,.19-.29v0l-.05-.31c0-.19-.07-.48-.12-.82a4.34,4.34,0,0,1-.05-.53V6.84a1.12,1.12,0,0,1,.17-.41c.1-.15.24-.29.41-.53a3,3,0,0,0,.24-.41,1.37,1.37,0,0,0,.07-.24A.69.69,0,0,0,17,5a.68.68,0,0,1,0-.12V4.67h0V4.6A2.23,2.23,0,0,0,17,4.24,8.87,8.87,0,0,0,16.7,3c-.09-.36-.21-.63-.28-.84l-.13-.32h0a.26.26,0,0,0-.24-.14.25.25,0,0,0-.21.26l.05.32c0,.19,0,.5.09.84s.07.75.1,1.16V4.6s0,.24,0,.26l-.07.2a.75.75,0,0,1-.12.21c-.12.15-.29.34-.46.58a1.73,1.73,0,0,0-.26.89v.19Z"
                  transform="translate(-1.76 -1.71)"
                />
                <path
                  d="M17,6.93V7a.34.34,0,0,0,0,.17c0,.12,0,.24,0,.36s.1.41.15.6A6.16,6.16,0,0,0,17.6,9a1.19,1.19,0,0,0,.12.21.48.48,0,0,0,0,.08.26.26,0,0,0,.24.12.26.26,0,0,0,.2-.29v0a2.48,2.48,0,0,1-.05-.31c0-.19-.07-.48-.12-.82A3,3,0,0,1,18,7.39V6.84a.86.86,0,0,1,.17-.41c.1-.15.24-.29.41-.53a3,3,0,0,0,.24-.41c0-.07.05-.15.07-.24A.69.69,0,0,0,18.92,5a1,1,0,0,1,0-.12V4.67h0V4.6a2.2,2.2,0,0,0,0-.36A10.61,10.61,0,0,0,18.63,3c-.1-.36-.22-.63-.29-.84s-.12-.32-.12-.32h0A.27.27,0,0,0,18,1.71a.26.26,0,0,0-.22.26,2.47,2.47,0,0,1,0,.32c0,.19.05.5.1.84s.07.75.09,1.16V4.6s0,.24,0,.26a1.5,1.5,0,0,0-.07.2,1.13,1.13,0,0,1-.12.21c-.12.15-.29.34-.46.58a1.73,1.73,0,0,0-.26.89v.12S17,6.91,17,6.93Z"
                  transform="translate(-1.76 -1.71)"
                />
                <path
                  d="M19,6.93V7a.5.5,0,0,0,0,.17c0,.12,0,.24.05.36s.1.41.14.6c.13.37.25.65.34.85l.12.21.05.08a.23.23,0,0,0,.43-.17v0s0-.12,0-.31S20,8.26,20,7.92a3,3,0,0,1-.05-.53V6.84a.86.86,0,0,1,.17-.41c.09-.15.24-.29.41-.53a4.5,4.5,0,0,0,.24-.41c0-.07,0-.15.07-.24A1,1,0,0,0,20.85,5a1,1,0,0,1,0-.12V4.67h0V4.6a1.49,1.49,0,0,0-.05-.36A10.8,10.8,0,0,0,20.56,3c-.1-.36-.22-.63-.29-.84s-.12-.32-.12-.32h0a.28.28,0,0,0-.24-.14.25.25,0,0,0-.22.26l0,.32c0,.19.05.5.09.84s.08.75.1,1.16V4.6s0,.24,0,.26a1.38,1.38,0,0,0-.08.2.75.75,0,0,1-.12.21c-.12.15-.28.34-.45.58a1.74,1.74,0,0,0-.27.89v.12S19,6.91,19,6.93Z"
                  transform="translate(-1.76 -1.71)"
                />
                <path
                  d="M28.7,17.1H7.31a1,1,0,0,0-.94,1.13,43.06,43.06,0,0,0,2.12,7.51c2.34,5.86,5.44,8.7,9.51,8.7s7.18-2.84,9.52-8.7a39.82,39.82,0,0,0,2.12-7.51A1,1,0,0,0,28.7,17.1Z"
                  transform="translate(-1.76 -1.71)"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    );
  }

  _executeSearch = async e => {
    e.preventDefault();
    const { filter } = this.state;
    const result = await this.props.client.query({
      query: SEARCH_SHOPS,
      variables: { filter }
    });
    const coffeeShops = result.data.searchShops;
    this.setState({ shops: coffeeShops });
    this.props.history.push({
      pathname: "./shops",
      state: { coffeeShops: coffeeShops }
    });
  };
}

export default withRouter(withApollo(Search));
