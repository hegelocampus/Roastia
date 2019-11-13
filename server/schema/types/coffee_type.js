const mongoose = require("mongoose")
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;

const Coffee = mongoose.model("coffee")

const CoffeeType = new GraphQLObjectType({
    name: "CoffeeType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        origin: { type: GraphQLString },
        processing: { type: GraphQLString },
        roasting: { type: GraphQLString },
        flavor: { type: new GraphQLList(GraphQLString) },
        price: { type: GraphQLInt },
        shops: {
            type: new GraphQLList(require('./coffee_shop_type').CoffeeShopType),
            resolve(parentValue) {
                return Coffee.findById(parentValue.id).populate("shops").then(coffee => coffee.shops);
            }
        }
    })
});

module.exports = CoffeeType;

