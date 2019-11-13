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

const AuthService = require("../../services/auth");

const User = mongoose.model("users");
const Coffee = mongoose.model("coffee")
const CoffeeShop = mongoose.model("coffeeShops")

const selectorInput = new GraphQLInputObjectType({
  name: 'Selectors',
  fields: {
    type: { type: GraphQLString },
    city: { type: GraphQLString },
    zip:  { type: GraphQLString },
    state: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

const FilterInputType = require('./filter_input_type')


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
      type: CoffeeType,
      resolve() {
        return Coffee.find({});
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
    },
    fetchFavoriteShops: {
        type: new GraphQLList(require("./coffee_shop_type").CoffeeShopType),
        async resolve(parentValue, args, ctx) {
            const validUser = await AuthService.verifyUser({ token: ctx.token });
            if (validUser.loggedIn) {
                const userId = validUser.id;
                return User.findById(userId).populate('favorites').then(user => user.favorites)
            } else {
                throw new Error("Please log in or sign up!")
            }
        }
    },
    fetchCurrentUser: {
        type: UserType,
        async resolve(parentValue, args, ctx) {
            const validUser = await AuthService.verifyUser({ token: ctx.token });
            if (validUser.loggedIn) {
                const userId = validUser.id;
                return User.findById(userId)
            } else {
                throw new Error("No one is logged in!")
            }
        }
    },
    fetchShopCoffees: {
        type: new GraphQLList(CoffeeType),
        args: {
          coffeeShopId: { type: GraphQLID },
          filter: { type: FilterInputType }
        },
        resolve(_, { coffeeShopId, filter }) {

            function buildFilters({ processing, roasting, flavor, price }) {
            
            let filters = {}

            if (processing) {
              filters.processing = processing
            }
            if (roasting) {
              filters.roasting = roasting
            }
            if (flavor && flavor.length !== 0) {
              filters.flavor = { $in: flavor };
            }
            if (price && price.length !== 0) {
              filters.price = { $gt: price[0], $lt: price[1] };
            }
            let updatedFilter = Object.keys(filters).length === 0 ? [] : [filters];
            return updatedFilter;
          }

            let query = fbuildFilters(filter).length === 0 ? {} : { $and: buildFilters(filters) }
            return Coffee.findShopCoffees(coffeeShopId, query);
          }
        }
  })
});

module.exports = RootQueryType;
