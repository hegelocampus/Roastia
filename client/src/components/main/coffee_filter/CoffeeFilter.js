import React from "react";
import { Link } from "react-router-dom";
import { withApollo } from "react-apollo";
import Queries from "../../../graphql/queries";

const { FETCH_SHOP_COFFEES } = Queries;

class CoffeeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffees: [],
      filter: {
        processing: "",
        roasting: "",
        price: [],
        flavor: []
      }
    };
    this.updateFlavor = this.updateFlavor.bind(this);
    this.updateProcess = this.updateProcess.bind(this);
    this.updateRoast = this.updateRoast.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.renderCoffees = this.renderCoffees.bind(this);
    this.fetchShopCoffees();
  }

  updateFlavor(e) {
    let flavors = [...this.state.filter["flavor"]];
    const idx = flavors.indexOf(e.target.name);
    if (idx !== -1) {
      flavors.splice(idx, 1);
    } else {
      flavors = flavors.concat([e.target.name]);
    }
    let newState = Object.assign({}, this.state);
    newState.filter["flavor"] = flavors;
    this.setState(newState);
    this.fetchShopCoffees(e);
  }

  updateProcess(e) {
    let newProcess;
    if (this.state.filter["processing"] === e.target.name) {
      newProcess = "";
    } else {
      newProcess = e.target.name;
    }

    let newState = Object.assign({}, this.state);
    newState.filter["processing"] = newProcess;
    this.setState(newState);
    this.fetchShopCoffees(e);
  }

  updateRoast(e) {
    let newRoast;
    if (this.state.filter["roasting"] === e.target.name) {
      newRoast = "";
    } else {
      newRoast = e.target.name;
    }
    let newState = Object.assign({}, this.state);
    newState.filter["roasting"] = newRoast;
    this.setState(newState);
    this.fetchShopCoffees(e);
  }

  updatePrice(e) {
    let newPrice;
    const str = e.target.name;
    const parsed = str.split(",").map(Number);
    if (JSON.stringify(this.state.filter["price"]) === JSON.stringify(parsed)) {
      newPrice = [];
    } else {
      newPrice = parsed;
    }
    let newState = Object.assign({}, this.state);
    newState.filter["price"] = newPrice;
    this.setState(newState);
    this.fetchShopCoffees(e);
  }

  async fetchShopCoffees(e) {
    const { filter } = this.state;
    const res = await this.props.client.query({
      query: FETCH_SHOP_COFFEES,

      variables: {
        coffeeShopId: this.props.shopId,
        filter: filter
      }
    });
    const selectedCoffees = res.data.fetchShopCoffees;
    this.setState({ coffees: selectedCoffees });
  }

  renderCoffees() {
    if (this.state.coffees.length === 0) {
      return <div>No coffees match your search!</div>;
    }
    const coffees = this.state.coffees.map(coffee => {
      return (
        <li key={coffee.id}>
          <Link to={`/coffee/${coffee.id}`}>{coffee.name}</Link>;
        </li>
      );
    });
    return coffees;
  }

  render() {
    return (
      <div>
        <div>
          Flavor
          <br />
          <label>
            Floral
            <input
              type="checkbox"
              name="floral"
              onClick={this.updateFlavor}
              onChange={() => {}}
            />
          </label>
          <label>
            Fruit
            <input
              type="checkbox"
              name="fruit"
              onClick={this.updateFlavor}
              onChange={() => {}}
            />
          </label>
          <label>
            Chocolate
            <input
              type="checkbox"
              name="chocolate"
              onClick={this.updateFlavor}
              onChange={() => {}}
            />
          </label>
          <label>
            Nut
            <input
              type="checkbox"
              name="nuts"
              onClick={this.updateFlavor}
              onChange={() => {}}
            />
          </label>
          <label>
            Spice
            <input
              type="checkbox"
              name="spice"
              onClick={this.updateFlavor}
              onChange={() => {}}
            />
          </label>
          <label>
            Roast
            <input
              type="checkbox"
              name="roast"
              onClick={this.updateFlavor}
              onChange={() => {}}
            />
          </label>
          <label>
            Sweetend Sugary
            <input
              type="checkbox"
              name="sugary"
              onClick={this.updateFlavor}
              onChange={() => {}}
            />
          </label>
        </div>
        <div>
          Processing Method
          <br />
          <label>
            Wet
            <input
              type="checkbox"
              name="Wet"
              onClick={this.updateProcess}
              checked={this.state.filter.processing === "Wet"}
              onChange={() => {}}
            />
          </label>
          <label>
            Dry
            <input
              type="checkbox"
              name="Dry"
              onClick={this.updateProcess}
              checked={this.state.filter.processing === "Dry"}
              onChange={() => {}}
            />
          </label>
        </div>
        <div>
          Roast Level
          <br />
          <label>
            Light
            <input
              type="checkbox"
              name="Light"
              onClick={this.updateRoast}
              checked={this.state.filter.roasting === "Light"}
              onChange={() => {}}
            />
          </label>
          <label>
            Medium
            <input
              type="checkbox"
              name="Medium"
              onClick={this.updateRoast}
              checked={this.state.filter.roasting === "Medium"}
              onChange={() => {}}
            />
          </label>
          <label>
            Dark
            <input
              type="checkbox"
              name="Dark"
              onClick={this.updateRoast}
              checked={this.state.filter.roasting === "Dark"}
              onChange={() => {}}
            />
          </label>
        </div>
        <div>
          Price
          <br />
          <label>
            Under $10
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
          </label>
          <label>
            $10 - $20
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
          </label>
          <label>
            $20 - $30
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
          </label>
        </div>
        <ul>{this.renderCoffees()}</ul>
      </div>
    );
  }
}
export default withApollo(CoffeeFilter);