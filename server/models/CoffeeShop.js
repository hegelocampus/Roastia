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

CoffeeShopSchema.index(
  { 'name': 'text',
   'address.state': 'text', 
   'address.city': 'text', 
   'type': 'text' },
  {
    weights: {
    name: 10,
    'address.state': 3,
    'address.city': 5,
    type: 2  
    }
  }
);

CoffeeShopSchema.statics.findCoffees = function (coffeeShopId) {
  return this.findById(coffeeShopId)
    .populate("coffees")
    .then(coffeeShop => coffeeShop.coffees);
};

CoffeeShopSchema.statics.removeCoffeeFromShop = (coffeeShopId, coffeeId) => {
  const CoffeeShop = mongoose.model("coffeeShops");
  const Coffee = mongoose.model("coffee");

  return CoffeeShop.findById(coffeeShopId).then(coffeeShop => {
    return Coffee.findById(coffeeId).then(coffee => {
      coffeeShop.coffees.pull(coffee);
      coffee.coffeeShops.pull(coffeeShop);

      return Promise.all([coffeeShop.save(), coffee.save()]).then(
        ([coffeeShop, coffee]) => coffeeShop
      );
    });
  });
};




module.exports = mongoose.model("coffeeShops", CoffeeShopSchema);
