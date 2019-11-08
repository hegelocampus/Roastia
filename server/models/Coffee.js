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

module.exports = mongoose.model('coffee', CoffeeSchema)