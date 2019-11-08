require("../../models/index");
const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const CoffeeType = require("./coffee_type");

const User = mongoose.model("users");
const Coffee = mongoose.model("coffee")

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
        }
    })
});

module.exports = RootQueryType;
