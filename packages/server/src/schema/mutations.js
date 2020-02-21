const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = graphql;

const AuthService = require('../services/auth');
const UserType = require('./types/user_type');
const CoffeeType = require('./types/coffee_type');
const CoffeeShopType = require('./types/coffee_shop_type').CoffeeShopType;

const Coffee = mongoose.model('coffee');
const CoffeeShop = mongoose.model('coffeeShops');

const User = mongoose.model('users');

const AddressInput = new GraphQLInputObjectType({
  name: 'Address',
  fields: {
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (_, args) => {
        return AuthService.register(args);
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (_, args) => {
        return AuthService.login(args);
      },
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID },
      },
      resolve: (_, args) => {
        return AuthService.logout(args);
      },
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString },
      },
      resolve: (_, args) => {
        return AuthService.verifyUser(args);
      },
    },
    addCoffeeToShop: {
      type: CoffeeType,
      args: {
        coffeeId: { type: GraphQLID },
        coffeeShopId: { type: GraphQLID },
      },
      resolve: (parentValue, args) => {
        return Coffee.addCoffeeToShop(args.coffeeId, args.coffeeShopId);
      },
    },
    removeCoffeeFromShop: {
      type: CoffeeType,
      args: {
        coffeeShopId: { type: GraphQLID },
        coffeeId: { type: GraphQLID },
      },
      resolve: (parentValue, { coffeeShopId, coffeeId }) => {
        return Coffee.removeCoffeeFromShop(coffeeShopId, coffeeId);
      },
    },
    addCoffee: {
      type: CoffeeType,
      args: {
        name: { type: GraphQLString },
        origin: { type: GraphQLString },
        processing: { type: GraphQLString },
        roasting: { type: GraphQLString },
        flavor: { type: new GraphQLList(GraphQLString) },
        price: { type: GraphQLInt },
      },
      resolve: (
        parentValue,
        { name, origin, processing, roasting, flavor, price }
      ) => {
        return new Coffee({
          name,
          origin,
          processing,
          roasting,
          flavor,
          price,
        }).save();
      },
    },
    newCoffeeShop: {
      type: CoffeeShopType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        url: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        founded: { type: GraphQLString },
        address: { type: AddressInput },
        type: { type: GraphQLString },
        baristaSatisfaction: { type: GraphQLInt },
      },
      resolve: (
        _,
        {
          name,
          description,
          url,
          imageURL,
          founded,
          address,
          type,
          baristaSatisfaction,
        }
      ) => {
        return new CoffeeShop({
          name,
          description,
          url,
          imageURL,
          founded,
          address,
          type,
          baristaSatisfaction,
        }).save();
      },
    },
    addFavorite: {
      type: UserType,
      args: {
        coffeeShopId: { type: GraphQLID },
      },
      resolve: async (parentValue, { coffeeShopId }, { token }) => {
        return await User.addFavorite(token, coffeeShopId);
      },
    },
    removeFavorite: {
      type: UserType,
      args: {
        coffeeShopId: { type: GraphQLID },
      },
      resolve: async (parentValue, { coffeeShopId }, { token }) => {
        return await User.removeFavorite(token, coffeeShopId);
      },
    },
    updateCoffeeShop: {
      type: CoffeeShopType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        url: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        founded: { type: GraphQLString },
        address: { type: AddressInput },
        type: { type: GraphQLString },
        baristaSatisfaction: { type: GraphQLInt },
      },
      resolve: (
        parentValue,
        {
          id,
          name,
          description,
          url,
          imageURL,
          founded,
          address,
          type,
          baristaSatisfaction,
        }
      ) => {
        const updateObj = {};

        if (id) updateObj.id = id;
        if (name) updateObj.name = name;
        if (description) updateObj.description = description;
        if (url) updateObj.url = url;
        if (imageURL) updateObj.imageURL = imageURL;
        if (founded) updateObj.founded = founded;
        if (address) updateObj.address = address;
        if (type) updateObj.type = type;
        if (baristaSatisfaction)
          updateObj.baristaSatisfaction = baristaSatisfaction;

        return CoffeeShop.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, coffeeShop) => {
            return coffeeShop;
          }
        );
      },
    },
    deleteCoffeeShop: {
      type: CoffeeShopType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => {
        return CoffeeShop.remove({ _id: id });
      },
    },
  },
});

module.exports = mutation;
