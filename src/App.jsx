import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Products from "./Components/Products";
import Categories from "./Components/Categories";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import storefrontReducer from "./store";
import SimpleCart from "./Components/simpleCart";
import thunk from "redux-thunk";

/* creating the reducer */
/* we can apply middlewares without using composeWithDevTools ==>     // createStore(reducers, applyMiddleware(thunk)); */
const storeFront = createStore(
  storefrontReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

/* ------------------- */
function App() {
  return (
    <Provider store={storeFront}>
      <Header />
      <Categories />
      <Products />
      <SimpleCart />
      {/* <Footer /> */}
    </Provider>
  );
}

export default App;
