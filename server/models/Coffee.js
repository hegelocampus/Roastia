const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoffeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    processing: {
        type: String,
        required: true
    },
    roasting: {
        type: String,
        required: true
    },
    flavor: [
        {
        type: String,
        required: true
        }
    ],
    price: {
        type: Number,
        required: true
    },
    shops: [
        {
        type: Schema.Types.ObjectId,
        ref: "coffeeShops"
        }
    ]

})

CoffeeSchema.statics.addCoffeeToShop = (coffeeId, coffeeShopId) => {
    const Coffee = mongoose.model("coffee");
    const CoffeeShop = mongoose.model("coffeeShops");

    return Coffee.findById(coffeeId).then(coffee => {
        return CoffeeShop.findById(coffeeShopId).then(shop => {
            coffee.shops.push(shop);
            shop.coffees.push(coffee);

            return Promise.all([coffee.save(), shop.save()]).then(
                ([coffee, shop]) => coffee
            );
        });
    });
};

CoffeeSchema.statics.findShopCoffees = (coffeeShopId, query) => {
    const Coffee = mongoose.model("coffee");
    const CoffeeShop = mongoose.model("coffeeShops");

    let coffeeIds = [];
    return CoffeeShop.findById(coffeeShopId).then(shop => {
        shop.coffees.forEach(coffee => {
            coffeeIds.push(coffee.id)
        })
        return Coffee.find(query).then(coffees => {
            return coffees.filter(coffee => !coffeeIds.includes(coffee.id))
        })
    })
}


module.exports = mongoose.model('coffee', CoffeeSchema)