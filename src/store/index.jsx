import categoryReducer from "./categories";
import productsReducer from "./products";
import { combineReducers } from "redux";
import cartReducer from "./cart";
const storefrontReducer = combineReducers({
  categories: categoryReducer,
  products: productsReducer,
  cart: cartReducer,
});

export default storefrontReducer;
