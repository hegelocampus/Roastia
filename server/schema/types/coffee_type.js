const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;

const CoffeeType = new GraphQLObjectType({
    name: "CoffeeType",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        origin: { type: GraphQLString },
        processing: { type: GraphQLString },
        roasting: { type: GraphQLString },
        flavor: { type: new GraphQLList(GraphQLString) },
        price: { type: GraphQLInt }
    })
});

module.exports = CoffeeType;