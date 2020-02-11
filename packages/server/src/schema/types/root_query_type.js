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
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(_, args) {
          return CoffeeShop.findById(args.id);
        }
      },
      searchShops: {
        type: new GraphQLList(require("./coffee_shop_type").CoffeeShopType),
        args: { filter: { type: GraphQLString } },
        async resolve(_, { filter }) {
          const coffees = await Coffee.find({
            "$or": [
              { "origin": { '$regex': filter, '$options': 'i' } },
              { "name": { '$regex': filter, '$options': 'i' } }
            ]
          })

          const coffeeShops = await CoffeeShop.find({
            "$or": [
              { "name": { '$regex': filter, '$options': 'i' } },
              { "address.state": { '$regex': filter, '$options': 'i' } },
              { "address.city": { '$regex': filter, '$options': 'i' } },
              { "address.zip": { '$regex': filter, '$options': 'i' } },
              { "coffees": { $in: coffees.map(coffee => coffee.id) } }
            ]
          });
          return coffeeShops;
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
            coffeeIds: { type: new GraphQLList(GraphQLID) },
            filter: { type: FilterInputType }
          },
          resolve(_, { coffeeIds, filter }) {

              function buildFilters({ processing, roasting, flavor, price }) {
                let filters = {}

                if (processing) {
                  filters.processing = { '$regex': processing, '$options': 'i' };
                }
                if (roasting) {
                  filters.roasting = { '$regex': roasting, '$options': 'i' };
                }
                if (flavor && flavor.length !== 0) {
                  const filterStr = flavor.map(flavor => `.*${flavor}.*`)
                  const flavorFilter = filterStr.map(str => new RegExp(str, "i"))

                  filters.flavor = { $in: flavorFilter };
                }
                if (price && price.length !== 0) {
                  filters.price = { $gt: price[0], $lt: price[1] };
                }
                const coffeeIdList = coffeeIds.map(id => new mongoose.Types.ObjectId(id))
                filters._id = { $in: coffeeIdList }  
          
                let updatedFilter = [filters];
                return updatedFilter;
              }

              let query = { $and: buildFilters(filter) }
              return Coffee.find(query);
            }
          }
      })
});

module.exports = RootQueryType;
