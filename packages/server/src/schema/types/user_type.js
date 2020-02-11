const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = graphql;


const mongoose = require("mongoose");
const User = mongoose.model("users")

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString },
        loggedIn: { type: GraphQLBoolean },
        favorites: {
            type: new GraphQLList(require('./coffee_shop_type').CoffeeShopType),
            resolve(parentValue) {
                return User.findById(parentValue._id).populate("favorites").then(user => user.favorites);
        }
    }
})
});

module.exports = UserType;