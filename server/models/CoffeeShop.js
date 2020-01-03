const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoffeeShopSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  imageURL: {
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
      type: String,
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
   'address.zip': 'text',
   'type': 'text' },
  {
    weights: {
    name: 10,
    'address.state': 3,
    'address.city': 5,
    'address.zip': 4,
    type: 2
    }
  }
);

CoffeeShopSchema.statics.findCoffees = (coffeeShopId) => {
  const CoffeeShop = mongoose.model("coffeeShop");

  return CoffeeShop.findById(coffeeShopId)
    .populate("coffees")
    .then(coffeeShop => coffeeShop.coffees);
};

CoffeeShopSchema.statics.addCoffee = ({ coffeeId, coffeeShopId }) => {
  const Coffee = mongoose.model("coffee");
  const CoffeeShop = mongoose.model("coffeeShop");
  console.log('shopId:', coffeeShopId);

  return Coffee.findById(coffeeId).then(coffee => {
    return CoffeeShop.findById(coffeeShopId)
      .populate("shops")
      .then(shop => {
        console.log('shop:', shop);
        const coffeeIds = shop.coffees.map(coffee => coffee._id);

        if (coffeeIds.includes(coffee._id)) {
          throw new Error("This coffee has already been added to the shop!")
        }

        coffee.shops.push(shop);
        shop.coffees.push(coffee);
        return Promise.all([coffee.save(), shop.save()]).then(
          ([coffee, shop]) => shop
        );
      });
  });
};


CoffeeShopSchema.statics.removeCoffeeFromShop = (coffeeShopId, coffeeId) => {
  const CoffeeShop = mongoose.model("coffeeShops");
  const Coffee = mongoose.model("coffee");

  return CoffeeShop.findById(coffeeShopId).then(coffeeShop => {
    return Coffee.findById(coffeeId).then(coffee => {
      coffeeShop.coffees.pull(coffee);
      coffee.shops.pull(coffeeShop);

      return Promise.all([coffeeShop.save(), coffee.save()]).then(
        ([coffeeShop, coffee]) => coffeeShop
      );
    });
  });
};




module.exports = mongoose.model("coffeeShop", CoffeeShopSchema);

