const mongoose = require("mongoose")
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;
const CoffeeShopType = require('./coffee_shop_type').CoffeeShopType;

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
            type: new GraphQLList(CoffeeShopType),
            resolve(parentValue) {
                return Coffee.findById(parentValue.id).populate("coffeeShop").then(coffee => coffee.shops)
            }

        }
    })
});

module.exports = CoffeeType;
