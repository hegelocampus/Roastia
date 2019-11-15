import './CoffeeFilter.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import Queries from '../../../graphql/queries';

const { FETCH_SHOP_COFFEES } = Queries;

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
    this.updateFlavor = this.updateFlavor.bind(this);
    this.updateProcess = this.updateProcess.bind(this);
    this.updateRoast = this.updateRoast.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.renderCoffees = this.renderCoffees.bind(this);
    this.fetchCoffeeIds = this.fetchCoffeeIds.bind(this);
    this.fetchShopCoffees();
  }

  updateFlavor(e) {
    let flavors = [...this.state.filter['flavor']];
    const idx = flavors.indexOf(e.target.name);
    if (idx !== -1) {
      flavors.splice(idx, 1);
    } else {
      flavors = flavors.concat([e.target.name]);
    }
    let newState = Object.assign({}, this.state);
    newState.filter['flavor'] = flavors;
    this.setState(newState);
    this.fetchShopCoffees(e);
  }

  updateProcess(e) {
    let newProcess;
    if (this.state.filter['processing'] === e.target.name) {
      newProcess = '';
    } else {
      newProcess = e.target.name;
    }

    let newState = Object.assign({}, this.state);
    newState.filter['processing'] = newProcess;
    this.setState(newState);
    this.fetchShopCoffees(e);
  }

  updateRoast(e) {
    let newRoast;
    if (this.state.filter['roasting'] === e.target.name) {
      newRoast = '';
    } else {
      newRoast = e.target.name;
    }
    let newState = Object.assign({}, this.state);
    newState.filter['roasting'] = newRoast;
    this.setState(newState);
    this.fetchShopCoffees(e);
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
    this.fetchShopCoffees(e);
  }

  fetchCoffeeIds() {
    return this.props.coffees.map(coffee => coffee.id);
  }

  async fetchShopCoffees(e) {
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
    return (
      <div>
        <div className="cofee-filter-container">
          <div className="coffee-filter-section">
            <span>Flavor</span>
            <div className="coffee-filter-options">
              <div className="option">
                <input
                  type="checkbox"
                  name="floral"
                  onClick={this.updateFlavor}
                  onChange={() => {}}
                />
                <label>Floral</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="fruit"
                  onClick={this.updateFlavor}
                  onChange={() => {}}
                />
                <label>Fruit</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="chocolate"
                  onClick={this.updateFlavor}
                  onChange={() => {}}
                />
                <label>Chocolate</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="nuts"
                  onClick={this.updateFlavor}
                  onChange={() => {}}
                />
                <label>Nut</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="spice"
                  onClick={this.updateFlavor}
                  onChange={() => {}}
                />
                <label>Spice</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="roast"
                  onClick={this.updateFlavor}
                  onChange={() => {}}
                />
                <label>Roast</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="sugar"
                  onClick={this.updateFlavor}
                  onChange={() => {}}
                />
                <label>Sugary</label>
              </div>
            </div>
          </div>
          <div className="coffee-filter-section">
            <span>Processing Method</span>
            <div className="coffee-filter-options">
              <div className="option">
                <input
                  type="checkbox"
                  name="unknown"
                  onClick={this.updateProcess}
                  checked={this.state.filter.processing === 'unknown'}
                  onChange={() => {}}
                />
                <label>Unknown</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="washed/wet"
                  onClick={this.updateProcess}
                  checked={this.state.filter.processing === 'washed/wet'}
                  onChange={() => {}}
                />
                <label>Washed</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="honey"
                  onClick={this.updateProcess}
                  checked={this.state.filter.processing === 'honey'}
                  onChange={() => {}}
                />
                <label>Semi-washed</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="natural"
                  onClick={this.updateProcess}
                  checked={this.state.filter.processing === 'natural'}
                  onChange={() => {}}
                />
                <label>Dry</label>
              </div>
            </div>
          </div>
          <div className="coffee-filter-section">
            <span>Roast Level</span>
            <div className="coffee-filter-options">
              <div className="option">
                <input
                  type="checkbox"
                  name="unknown"
                  onClick={this.updateRoast}
                  checked={this.state.filter.roasting === 'unknown'}
                  onChange={() => {}}
                />
                <label>Unknown</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="light"
                  onClick={this.updateRoast}
                  checked={this.state.filter.roasting === 'light'}
                  onChange={() => {}}
                />
                <label>Light</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="medium-light"
                  onClick={this.updateRoast}
                  checked={this.state.filter.roasting === 'medium-light'}
                  onChange={() => {}}
                />
                <label>Medium-light</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="medium"
                  onClick={this.updateRoast}
                  checked={this.state.filter.roasting === 'medium'}
                  onChange={() => {}}
                />
                <label>Medium</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="medium-dark"
                  onClick={this.updateRoast}
                  checked={this.state.filter.roasting === 'medium-dark'}
                  onChange={() => {}}
                />
                <label>Medium-dark</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  name="dark"
                  onClick={this.updateRoast}
                  checked={this.state.filter.roasting === 'dark'}
                  onChange={() => {}}
                />
                <label>Dark</label>
              </div>
            </div>
          </div>
          <div className="coffee-filter-section">
            <span>Price</span>
            <div className="coffee-filter-options">
              <div className="option">
                <input
                  type="checkbox"
                  onClick={this.updatePrice}
                  name={[0, 10]}
                  checked={
                    JSON.stringify(this.state.filter.price) ===
                    JSON.stringify([0, 10])
                  }
                  onChange={() => {}}
                />
                <label>Under $10</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  onClick={this.updatePrice}
                  name={[10, 20]}
                  checked={
                    JSON.stringify(this.state.filter.price) ===
                    JSON.stringify([10, 20])
                  }
                  onChange={() => {}}
                />
                <label>$10 - $20</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  onClick={this.updatePrice}
                  name={[20, 30]}
                  checked={
                    JSON.stringify(this.state.filter.price) ===
                    JSON.stringify([20, 30])
                  }
                  onChange={() => {}}
                />
                <label>$20 - $30</label>
              </div>
            </div>
          </div>
        </div>
        <div className="filtered-coffee-container">{this.renderCoffees()}</div>
      </div>
    );
  }
}
export default withApollo(CoffeeFilter);
