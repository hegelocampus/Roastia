const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 32
  },
  date: {
    type: Date,
    default: Date.now
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "coffeeShops"
    }
  ],
});

const findUserAndShop = async (token, shopId) => {
  const AuthService = require("../services/auth");
  const { id: userId, loggedIn } = await AuthService.verifyUser({ token });

  if (loggedIn) {
    const User = mongoose.model("users");
    const CoffeeShop = mongoose.model("coffeeShops");

    const user = await User.findById(userId);
    const shop = await CoffeeShop.findById(shopId);
    return { user, shop };
  } else {
    throw "Active user not found";
  }
}

const saveUserAndShop = async (user, shop) => {
  try {
    await user.save();
    await shop.save();
    return user;
  } catch(e) {
    console.error(e);
    return -1;
  }
}

UserSchema.statics.addFavorite = async function(token, coffeeShopId) {
  const { user, shop } = await findUserAndShop(token, coffeeShopId);

  user.favorites.push(shop);
  shop.users.push(user);

  return saveUserAndShop(user, shop);
}

UserSchema.statics.removeFavorite = async function(token, coffeeShopId) {
  const { user, shop } = await findUserAndShop(token, coffeeShopId);

  user.favorites.pull(shop);
  shop.users.pull(user);

  return saveUserAndShop(user, shop);
};

module.exports = mongoose.model("users", UserSchema);
