const graphql = require("graphql");
const { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql;


const FilterInputType = new GraphQLInputObjectType({
    name: 'FilterInputType',
    fields: {
        processing: { type: new GraphQLList(GraphQLString) },
        roasting: { type: new GraphQLList(GraphQLString) },
        flavor: { type: new GraphQLList(GraphQLString) },
        price: { type: new GraphQLList(GraphQLInt) }
    }
});

module.exports = FilterInputType;
