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
            const coffeeIds = shop.coffees.map(coffee => coffee._id)
            if (coffeeIds.includes(coffee._id)) {
                throw new Error("This coffee has already been added to the shop!")
            } 
            coffee.shops.push(shop);
            shop.coffees.push(coffee);
            return Promise.all([coffee.save(), shop.save()]).then(
            ([coffee, shop]) => coffee)

        });
    });
};

module.exports = mongoose.model('coffee', CoffeeSchema)