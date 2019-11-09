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
    ]
});

UserSchema.statics.addFavorite = (userId, coffeeShopId) => {
    const User = mongoose.model("users");
    const CoffeeShop = mongoose.model("coffeeShops");

    return User.findById(userId).then(user => {
        return CoffeeShop.findById(coffeeShopId).then(shop => {
            user.favorites.push(shop);
            shop.users.push(user);

            return Promise.all([user.save(), shop.save()]).then(
                ([user, shop]) => user
            );
        });
    });
};

UserSchema.statics.removeFavorite = (userId, coffeeShopId) => {
    const User = mongoose.model("users");
    const CoffeeShop = mongoose.model("coffeeShops");

    return User.findById(userId).then(user => {
        return CoffeeShop.findById(coffeeShopId).then(shop => {
            user.favorites.pull(shop);
            shop.users.pull(user);

            return Promise.all([user.save(), shop.save()]).then(
                ([user, shop]) => user
            );
        });
    });
};

module.exports = mongoose.model("users", UserSchema);
