import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Products from "./Components/Products";
import Categories from "./Components/Categories";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import storefrontReducer from "./store";
import SimpleCart from "./Components/simpleCart";

/* creating the reducer */
const storeFront = createStore(storefrontReducer, composeWithDevTools());
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
