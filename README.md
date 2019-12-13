# Roastia

Link: [Roastia](https://roastia.herokuapp.com)

![Home Page](https://roastia.s3.us-east-2.amazonaws.com/Animated+GIF-downsized_large.gif)

## Background and Overview 
  Craft coffee shops have experienced high growth over the recent decade,
  and as such, demand has increased for fair-trade, ethically-sourced,
  craft coffee across the country.

  Roastia allows indie coffee enthusiasts to find craft coffee shops
  by location, name, origin and coffee attributes. They can then filter a shop's coffee by desired taste qualities.

## Technologies  
### Backend:  
  * MongoDB — NoSQL database
  * Mongoose — Object Data Modeling (ODM)
  * Express.js — Server framework
  * Node — Runtime environment
  * GraphQL - API endpoints
  * Docker — Containerization of app for easy deployment

### Frontend:
  * React.js — UI framework
  * Apollo GraphQL — Frontend state management and GraphQL implementation
  * SCSS — Consistent sitewide styling
  * React Autosuggest — Provides realtime text suggestions for user search input


## Technical Challenges  
  ## Partial-text Search  
  MongoDB does not directly support partial-word matching as it does with full-text
  search.

  Our aim was to A) achieve partial-text search with MongoDB that integrates with Mongoose, React Autosuggest and related GraphQL queries, as well as B) accomplish this on both the `Coffee` and `CoffeeShop` collections to provide the user with versatile
  search.

  We achieved partial-text search by designing a GraphQL endpoint `searchShops` that
  incorporated MongoDB `$regex` matching for the search string with Mongoose queries
  for both collections (see code snippet below).

  ```javascript
    searchShops: {
        type: new GraphQLList(require("./coffee_shop_type").CoffeeShopType),
        args: { filter: { type: GraphQLString } },
        async resolve(_, { filter }) {
          const coffees = await Coffee.find({
            "$or": [
              { "origin": { '$regex': filter, '$options': 'i' } },
              { "name": { '$regex': filter, '$options': 'i' } }
            ]
          })

          const coffeeShops = await CoffeeShop.find({
            "$or": [
              { "name": { '$regex': filter, '$options': 'i' } },
              { "address.state": { '$regex': filter, '$options': 'i' } },
              { "address.city": { '$regex': filter, '$options': 'i' } },
              { "address.zip": { '$regex': filter, '$options': 'i' } },
              { "coffees": { $in: coffees.map(coffee => coffee.id) } }
            ]
          });
          return coffeeShops;
        }
    }
  ```
  

## Functionality  
  1. Coffee shops  
    * Users can search for coffee shops based on zip code, street, state and name, as well as by coffee name and origin.  
    * Coffee  
      * Users can search for coffees by name and origin or view them under their respective coffee shops.  
      * Coffee can be filtered by processing, roast, flavor and origin.  
  
  <!-- ![Coffee Shop](https://roastia.s3.us-east-2.amazonaws.com/roastia-shop.gif) -->
  <p align="center"><i>Coffee Shop Page</i></p>
  <p align="center">
    <img alt="Coffee Shop" src="https://roastia.s3.us-east-2.amazonaws.com/roastia-shop.gif">
  </p>
  
  2. Favorite coffee shops  
    * Users can favorite coffee shops that they are interested in and view them under "Saved Coffee Shops".  

  <p align="center"><i>Favorite Coffee Shops Listing</i></p>
  <p align="center">
    <img alt="Favorite Shops" src="https://roastia.s3.us-east-2.amazonaws.com/roastia-favorites.png" width="600">
  </p>
  
  3. Users   
    * Users can sign up and login.  
    * Once logged in, they can view their favorite coffee shops, as well as add their own coffee shops and related coffees.

  4. Search  
    * Search allows users to find coffees and shops by the criteria mentioned above, and are presented with autocomplete suggestions as they type.  
  
  <p align="center"><i>Search with Autosuggest</i></p>
  <p align="center">
    <img alt="Search" src="https://roastia.s3.us-east-2.amazonaws.com/roastia-search.png" width="600">
  </p>

  Thanks for checking out Roastia!