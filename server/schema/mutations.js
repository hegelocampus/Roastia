const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList } = graphql;
const { CoffeeShopType, AddressType } = require("./types/coffee_shop_type");
const UserType = require("./types/user_type");
const CoffeeShop = mongoose.model("coffeeShops");
const AuthService = require("../services/auth");

const CoffeeType = require('./types/coffee_type');
const Coffee = mongoose.model('coffee')

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        register: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.register(args);
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.login(args);
            }
        },
        logout: {
            type: UserType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, args) {
                return AuthService.logout(args);
            }
        },
        verifyUser: {
            type: UserType,
            args: {
                token: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.verifyUser(args);
            }
        },
        addCoffeeToShop: {
            type: CoffeeType,
            args: { 
                coffeeId: { type: GraphQLID }, 
                coffeeShopId: { type: GraphQLID }, 
            },
            resolve(parentValue, args) {
                return Coffee.addCoffeeToShop(args.coffeeId, args.coffeeShopId)
            }
        },
        addCoffee: {
            type: CoffeeType,
            args: {
                name: { type: GraphQLString },
                origin: { type: GraphQLString },
                processing: { type: GraphQLString },
                roasting: { type: GraphQLString },
                flavor: { type: new GraphQLList(GraphQLString) },
                price: { type: GraphQLInt }
            },
            resolve(parentValue, { name, origin, processing, roasting, flavor, price }) {
                return new Coffee({ name, origin, processing, roasting, flavor, price }).save();
            }
        },
        newCoffeeShop: {
            type: CoffeeShopType,
            args: {
                name: { type: GraphQLString },
                founded: { type: GraphQLInt },
                address: { type: AddressType },
                type: { type: GraphQLString },
                baristaSatisfaction: { type: GraphQLInt },
            },
            resolve(_, { name }) {
                return new CoffeeShop({
                    name, founded, address, type, baristaSatisfaction 
                }).save();
            }
        },

    }
});

module.exports = mutation;
