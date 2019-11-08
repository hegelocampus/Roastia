const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const { CoffeeShopType, AddressType } = require("./types/coffee_shop_type");
const UserType = require("./types/user_type");
const CoffeeShop = mongoose.model("coffeeShops");
const AuthService = require("../services/auth");

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
