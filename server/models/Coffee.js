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
        ref: "coffeeShop"
        }
    ]

})

CoffeeSchema.statics.addCoffeeToShop = (coffeeId, coffeeShopId) => {
    const Coffee = mongoose.model("coffee");
    const CoffeeShop = mongoose.model("coffeeShop");

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


module.exports = mongoose.model('coffee', CoffeeSchema)