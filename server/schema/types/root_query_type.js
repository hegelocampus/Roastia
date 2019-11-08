require("../../models/index");
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
// const User = mongoose.model("users");
const { CoffeeShopType } = require("./coffee_shop_type");

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
        coffeeShops: {
            type: new GraphQLList(CoffeeShopType),
            resolve() {
                return CoffeeShop.find({});
            }
        },
        coffeeShop: {
            type: CoffeeShopType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return CoffeeShop.findById(args._id);
            }
        },

    })
});

module.exports = RootQueryType;
