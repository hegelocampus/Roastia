const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

const CoffeeShop = mongoose.model("coffeeShops");

const AddressType = new GraphQLObjectType({
  name: 'AddressType',
  fields: {
    street: {
      type: GraphQLString
    },
    city: {
      type: GraphQLString
    },
    state: {
      type: GraphQLString
    },
    zip: {
      type: GraphQLInt
    }
  }
});

const CoffeeShopType = new GraphQLObjectType({
  name: "CoffeeShopType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    founded: { type: GraphQLInt },
    address: { type: AddressType },
    type: { type: GraphQLString },
    baristaSatisfaction: { type: GraphQLInt },
    coffees: {
      type: new GraphQLList(require("./coffee_type")),
      resolve(parentValue) {
        return CoffeeShop.findCoffees(parentValue.id);
      }
    }
  })
});

module.exports = { CoffeeShopType, AddressType };

