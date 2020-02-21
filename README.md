# Roastia
> [![Maintainability](https://api.codeclimate.com/v1/badges/a13d0eb540b67b8b909f/maintainability)](https://codeclimate.com/github/hegelocampus/Roastia/maintainability)

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
| Technology        | Use                             |
| ----------------- | ------------------------------- |
| MongoDB           | NoSQL database                  |
| Mongoose          | Object Data Modeling (ODM)      |
| Express.js        | Server framework                |
| Node.js           | Runtime environment             |
| GraphQL           | API endpoints                   |
| Docker            | Containerization for deployment |

### Frontend:
| Technology        | Use                                         |
| ----------------- | ------------------------------------------- |
| React.js          | UI framework                                |
| Apollo GraphQL    | State management and GraphQL implementation |
| SCSS              | Consistent sitewide styling                 |
| Styled Components | Modern atomized styling                     |
| React Autosuggest | Realtime text suggestions for search input  |
| Formik            | Simplifies forms and reduces broilerplate   |


## Technical Challenges
  ### Partial-text Search
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

  ### Debouncing Search in React
  We knew that we needed to add debouncing to the searches because without debouncing the server would process the desired filter parameters for each individual inputted character, this results in a significant amount of unproductive strain on the servers. But, because of React's event pooling which foils any traditional debouncing methods, optimizing code through the use of debouncing was a substantial challenge.  
  We overcame this challenge through the use of the packages [awesome-debounce-promise](https://github.com/slorber/awesome-debounce-promise) and [react-async-hook](https://github.com/slorber/react-async-hook). Through these we were able to engineer the following hook, that handled both the debouncing of the request callbacks and actual construction of the requests.
  ```javascript
export default props => {
  const client = useApolloClient();
  const [filter, setFilter] = useState('');

  const [debouncedQuery] = useState(
    () => DebouncePromise((value) => {
      if (value.length < 1) {
        return [];
      } else {
        return client.query({
          query: SEARCH_SHOPS,
          variables: { filter: value },
        }).then(({ data: { searchShops }}) => {
          return searchShops;
        }, e => {
          return [];
        })
      }
    },
      150
    )
  )

  const search = useAsync(debouncedQuery, [filter]);

  return {
    filter,
    setFilter,
    search
  }
}
  ```
  Then when it came time to actually implement the debounced query all we had to do was insert the following line of code into the desired component:
```javascript
const { filter, setFilter, search} = useDebouncedSearch();
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
