import './CoffeeFilter.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import Queries from '../../../graphql/queries';

const { FETCH_SHOP_COFFEES } = Queries;

const FLAVORS = ['floral', 'fruit', 'chocolate', 'nuts', 'spice', 'roast', 'sugar'];
const PROCESSES = ['unknown', 'honey', 'washed', 'dry'];
const ROASTS = ['unknown', 'light', 'medium-light', 'medium', 'medium-dark', 'dark'];
const PRICES = [
  ['Under $10', [0, 10]],
  ['$10 - $20', [10, 20]],
  ['$20 - $30', [20, 30]],
];

class CoffeeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffees: [],
      filter: {
        processing: '',
        roasting: '',
        price: [],
        flavor: [],
      },
    };
    this.updateAttribute = this.updateAttribute.bind(this);
    this.updateRoast = this.updateRoast.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.renderCoffees = this.renderCoffees.bind(this);
    this.fetchCoffeeIds = this.fetchCoffeeIds.bind(this);
    this.fetchShopCoffees();
  }

  updateAttribute(type) {
    // I have no fucking idea what's going on here anymore
    return async ({ target: { name }}) => {
      await this.setState(oldState => {
        let attributes = [...oldState.filter[type]];
        const idx = attributes.indexOf(name);
        if (idx !== -1) {
          attributes.splice(idx, 1);
        } else {
          attributes = attributes.concat([name]);
        }
        let newState = Object.assign({}, this.state);
        console.log(newState);
        console.log(attributes);
        return newState.filter[type] = attributes;
      });
      this.fetchShopCoffees();
    }
  }

  updateRoast(e) {
    let newRoast;
    if (this.state.filter['roast'] === e.target.name) {
      newRoast = '';
    } else {
      newRoast = e.target.name;
    }
    let newState = Object.assign({}, this.state);
    newState.filter['roasting'] = newRoast;
    this.setState(newState);
    this.fetchShopCoffees();
  }

  updatePrice(e) {
    let newPrice;
    const str = e.target.name;
    const parsed = str.split(',').map(Number);
    if (JSON.stringify(this.state.filter['price']) === JSON.stringify(parsed)) {
      newPrice = [];
    } else {
      newPrice = parsed;
    }
    let newState = Object.assign({}, this.state);
    newState.filter['price'] = newPrice;
    this.setState(newState);
    this.fetchShopCoffees();
  }

  fetchCoffeeIds() {
    return this.props.coffees.map(coffee => coffee.id);
  }

  async fetchShopCoffees() {
    const { filter } = this.state;

    const res = await this.props.client.query({
      query: FETCH_SHOP_COFFEES,

      variables: {
        coffeeIds: this.fetchCoffeeIds(),
        filter: filter,
      },
    });

    const selectedCoffees = res.data.fetchShopCoffees;
    this.setState({ coffees: selectedCoffees });
  }

  renderCoffees() {
    if (this.state.coffees.length === 0) {
      return <p>No coffees match your search!</p>;
    }
    const coffees = this.state.coffees.map(coffee => {
      return (
        <div className="coffee-info-pan" key={coffee.id}>
          <img
            src="https://we-camp-seeds.s3.us-east-2.amazonaws.com/Coffee+bean.jpg"
            alt="coffee-img"
          />
          <div className="coffee-detail">
            <li>{coffee.name}</li>
            <li>{coffee.origin}</li>
          </div>
          <Link to={`/coffee/${coffee.id}`}>View Details</Link>
        </div>
      );
    });
    return coffees;
  }

  render() {
    const flavorInputs = FLAVORS.map((name, i) => (
      <div className="option" key={`${name}${i}`}>
        <input
          type="checkbox"
          name={name}
          onClick={this.updateAttribute('flavor')}
        />
        <label>{name}</label>
      </div>
    ));
    const processInputs = PROCESSES.map((name, i) => (
      <div className="option" key={`${name}${i}`}>
        <input
          type="checkbox"
          name={name}
          onClick={this.updateAttribute('processing')}
        />
        <label>{name}</label>
      </div>
    ));
    const roastInputs = ROASTS.map((name, i) => (
      <div className="option" key={`${name}${i}`}>
        <input
          type="checkbox"
          name={name}
          onClick={this.updateRoast}
        />
        <label>{name}</label>
      </div>
    ));
    const priceInputs = PRICES.map(([string, value], i) => (
      <div className="option" key={`${string}${i}`}>
        <input
          type="checkbox"
          name={value}
          onClick={this.updatePrice}
        />
        <label>{string}</label>
      </div>
    ));
    return (
      <div>
        <div className="cofee-filter-container">
          <div className="coffee-filter-section">
            <span>Flavor</span>
            <div className="coffee-filter-options">
              {flavorInputs}
            </div>
          </div>
          <div className="coffee-filter-section">
            <span>Processing Method</span>
            <div className="coffee-filter-options">
              {processInputs}
            </div>
          </div>
          <div className="coffee-filter-section">
            <span>Roast Level</span>
            <div className="coffee-filter-options">
              {roastInputs}
            </div>
          </div>
          <div className="coffee-filter-section">
            <span>Price</span>
            <div className="coffee-filter-options">
              {priceInputs}
            </div>
          </div>
        </div>
        <div className="filtered-coffee-container">{this.renderCoffees()}</div>
      </div>
    );
  }
}
export default withApollo(CoffeeFilter);
