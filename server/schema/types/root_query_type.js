require("../../models/index");
const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = graphql;

const UserType = require("./user_type");
const CoffeeType = require("./coffee_type");
const CoffeeShopType = require("./coffee_shop_type").CoffeeShopType;

const User = mongoose.model("users");
const Coffee = mongoose.model("coffee")
const CoffeeShop = mongoose.model("coffeeShops")

const selectorInput = new  GraphQLInputObjectType({
  name: 'Selectors',
  fields: {
    name: { type: GraphQLString },
    city: { type: GraphQLString },
    zip:  { type: GraphQLInt }
  }
});

const FilterInputType = require('./filter_input_type')


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
            args: { filter: { type: FilterInputType } },
            resolve(_, {filter}) {

                function buildFilters({ processing, roasting, flavor, price }) {
                    
                    const filter = (processing || roasting || flavor || price ) ? {} : null;
                    
                    if (processing) {
                        filter.processing = `${processing}`;
                    }
                    if (roasting) {
                        filter.roasting = `${roasting}`;
                    }
                    if (flavor) {
                        filter.flavor = {$in: flavor};
                    }
                    if (price) {
                        filter.price = {$gt: price[0], $lt: price[1]};
                    }
                    let filters = filter ? [filter] : [];
                    return filters;
                }

                let query = filter ? {$and: buildFilters(filter)} : {};
                return Coffee.find(query)
            }
        },
        coffee: {
            type: CoffeeType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Coffee.findById(args.id)
            }
        },
        coffeeShops: {
            type: new GraphQLList(require("./coffee_shop_type").CoffeeShopType),
            args: { selectors: { type: selectorInput }},
            resolve(_, { selectors }) {
                    
                    const { name, city, zip } = selectors;
                    const selector = (name || city || zip) ? {} : null;

                    if (name) {
                        selector.name = {$regex: `.*${name}.*`};
                    }
                    if (city) {
                        selector['address.city']= city;
                    }
                    if (zip) {
                        selector['address.zip']= zip;
                    }

                let query = selector ? selector : {};
                return CoffeeShop.find(query)
            }
        },
        coffeeShop: {
            type: require("./coffee_shop_type").CoffeeShopType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }},
            resolve(_, args) {
                return CoffeeShop.findById(args.id);
            }
        }

    })
});

module.exports = RootQueryType;
