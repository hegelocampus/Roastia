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
const UserType = require("./user_type")

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
      type: GraphQLString
    }
  }
});

const CoffeeShopType = new GraphQLObjectType({
  name: "CoffeeShopType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    url: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    founded: { type: GraphQLString },
    address: { type: AddressType },
    type: { type: GraphQLString },
    baristaSatisfaction: { type: GraphQLInt },
    coffees: {
      type: new GraphQLList(require("./coffee_type")),
      resolve(parentValue) {
        return CoffeeShop.findCoffees(parentValue.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return CoffeeShop.findById(parentValue.id).populate("users").then(coffeeShop => coffeeShop.users)
      }

    }
  })
});

module.exports = { CoffeeShopType, AddressType };



