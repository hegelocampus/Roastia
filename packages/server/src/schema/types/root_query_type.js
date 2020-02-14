require('../../models/index');
const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = graphql;

const UserType = require('./user_type');
const CoffeeType = require('./coffee_type');
const CoffeeShopType = require('./coffee_shop_type').CoffeeShopType;

const AuthService = require('../../services/auth');

const User = mongoose.model('users');
const Coffee = mongoose.model('coffee');
const CoffeeShop = mongoose.model('coffeeShops');

const selectorInput = new GraphQLInputObjectType({
  name: 'Selectors',
  fields: {
    type: { type: GraphQLString },
    city: { type: GraphQLString },
    zip: { type: GraphQLString },
    state: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

const FilterInputType = require('./filter_input_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: () => User.find({}),
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args) => User.findById(args._id),
    },
    coffees: {
      type: CoffeeType,
      resolve: () => Coffee.find({}),
    },
    coffee: {
      type: CoffeeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args) => Coffee.findById(args.id),
    },
    coffeeShops: {
      type: new GraphQLList(require('./coffee_shop_type').CoffeeShopType),
      resolve: () => CoffeeShop.find({}),
    },
    coffeeShop: {
      type: require('./coffee_shop_type').CoffeeShopType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args) => CoffeeShop.findById(args.id),
    },
    searchShops: {
      type: new GraphQLList(require('./coffee_shop_type').CoffeeShopType),
      args: { filter: { type: GraphQLString } },
      resolve: async (_, { filter }) => {
        const coffees = await Coffee.find({
          $or: [
            { origin: { $regex: filter, $options: 'i' } },
            { name: { $regex: filter, $options: 'i' } },
          ],
        });

        const coffeeShops = await CoffeeShop.find({
          $or: [
            { name: { $regex: filter, $options: 'i' } },
            { 'address.state': { $regex: filter, $options: 'i' } },
            { 'address.city': { $regex: filter, $options: 'i' } },
            { 'address.zip': { $regex: filter, $options: 'i' } },
            { coffees: { $in: coffees.map(coffee => coffee.id) } },
          ],
        });
        return coffeeShops;
      },
    },
    fetchFavoriteShops: {
      type: new GraphQLList(require('./coffee_shop_type').CoffeeShopType),
      resolve: async (parentValue, args, ctx) => {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        if (validUser.loggedIn) {
          const userId = validUser.id;
          return User.findById(userId)
            .populate('favorites')
            .then(user => user.favorites);
        } else {
          throw new Error('Please log in or sign up!');
        }
      },
    },
    fetchCurrentUser: {
      type: UserType,
      resolve: async (parentValue, args, ctx) => {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        if (validUser.loggedIn) {
          const userId = validUser.id;
          return User.findById(userId);
        } else {
          throw new Error('No one is logged in!');
        }
      },
    },
    fetchShopCoffees: {
      type: new GraphQLList(CoffeeType),
      args: {
        shopId: { type: GraphQLID },
        filter: { type: FilterInputType },
      },
      resolve: async (
        _,
        { shopId, filter: { processing, roasting, flavor, price } }
      ) => {
        let filters = { shops: { _id: shopId } };

        if (processing) {
          filters.processing = new RegExp(processing, "i");
        }

        if (roasting) {
          filters.roasting = new RegExp(roasting, "i");
        }

        if (flavor && flavor.length !== 0) {
          const flavorFilter = flavor.map(str => new RegExp(`.*${str}.*`, "i"));

          filters.flavor = { $in: flavorFilter };
        }

        if (price && price.length !== 0) {
          filters.price = { $gt: price[0], $lt: price[1] };
        }

       let coffees = await Coffee.find()
          .where({ $and: [filters] })
          .exec((err, shop) => shop.coffees);
        console.log(coffees);
        return coffees || [];
      },
    },
  })
});

module.exports = RootQueryType;
