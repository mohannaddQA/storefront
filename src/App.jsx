import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Products from "./Components/Products";
import Categories from "./Components/Categories";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import storefrontReducer from "./store";

/* creating the reducer */
const storeFront = createStore(storefrontReducer, composeWithDevTools());
/* ------------------- */
function App() {
  let categoryState = storeFront.getState().categories; //==> to access the state and send it to the component
  return (
    <Provider store={storeFront}>
      <Header />
      {/* <Categories categories={categoryState.categories} /> */}
      <Products />
      <Footer />
    </Provider>
  );
}

export default App;
