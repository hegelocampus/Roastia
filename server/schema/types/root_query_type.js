require("../../models/index");
const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = graphql;

const UserType = require("./user_type");
const CoffeeType = require("./coffee_type");
const CoffeeShopType = require("./coffee_shop_type").CoffeeShopType;

const User = mongoose.model("users");
const Coffee = mongoose.model("coffee")
const CoffeeShop = mongoose.model("coffeeShops")

const selectorInput = new GraphQLInputObjectType({
  name: 'Selectors',
  fields: {
    type: { type: GraphQLString },
    city: { type: GraphQLString },
    zip:  { type: GraphQLInt },
    state: { type: GraphQLString }
  }
});


const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.find({});
            }
        },
        user: {
            type: UserType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return User.findById(args._id);
            }
        },
        coffees: {
            type: new GraphQLList(CoffeeType),
            resolve() {
                return Coffee.find({})
            }
        },
        coffee: {
            type: CoffeeType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Coffee.findById(args.id)
            }
        },
        coffeeShops: {
            type: new GraphQLList(require("./coffee_shop_type").CoffeeShopType),
            args: { selectors: { type: selectorInput }},
            resolve() {
                return CoffeeShop.find({});
            }
        },
        coffeeShop: {
            type: require("./coffee_shop_type").CoffeeShopType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }},
            resolve(_, args) {
                return CoffeeShop.findById(args.id);
            }
        },
        searchShops: {
            type: new GraphQLList(require("./coffee_shop_type").CoffeeShopType),
            args: { filter: { type: GraphQLString }},
            resolve(_, { filter }) {
                return CoffeeShop.find({ $text: { $search: filter }});
            }
        }
    })
});

module.exports = RootQueryType;
