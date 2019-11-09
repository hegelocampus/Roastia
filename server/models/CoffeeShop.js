const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoffeeShopSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  founded: {
    type: String,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true,
      uppercase: true
    },
    zip: {
      type: Number,
      required: true
    },
  },
  type: {
    type: String,
    required: true
  },
  baristaSatisfaction: {
    type: Number,
    required: true
  },
  coffees: [
    {
      type: Schema.Types.ObjectId,
      ref: "coffee"
    }
  ],
  users: [
    {
    type: Schema.Types.ObjectId,
    ref: "users"
    }  
  ]
});

CoffeeShopSchema.statics.findCoffees = function (coffeeShopId) {
  return this.findById(coffeeShopId)
    .populate("coffees")
    .then(coffeeShop => coffeeShop.coffees);
};





module.exports = mongoose.model("coffeeShops", CoffeeShopSchema);
