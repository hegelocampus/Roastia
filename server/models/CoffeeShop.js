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
  type: {
    type: String,
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "products"
    }
  ]
});

CoffeeShopSchema.statics.findCoffees = function (coffeeShopId) {
  return this.findById(coffeeShopId)
    .populate("coffees")
    .then(coffeeShop => coffeeShop.coffees);
};

module.exports = mongoose.model("coffeeShops", CoffeeShopSchema);
