import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { connect } from "react-redux";
import "./index.css";
function Categories(props) {
  /* --- this not a good practice but just for demo --> after this we send the state from the app level */
  // const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    // if (event.target.innerText === categories.activeCategory.display) {
    if (event.target.innerText === props.categoryState.activeCategory.display) {
      dispatch({
        type: "CLEAR_ACTIVECATEGORY",
        payload: "",
      });
      let categorySelectors = document.getElementsByClassName("activeCategory");
      for (let i = 0; i < categorySelectors.length; i++) {
        categorySelectors[i].classList.remove("activeCategory");
      }
    } else {
      dispatch({
        type: "SET_ACTIVECATEGORY",
        payload: event.target.innerText,
      });
      let categorySelectors = document.getElementsByClassName("activeCategory");
      for (let i = 0; i < categorySelectors.length; i++) {
        categorySelectors[i].classList.remove("activeCategory");
      }
      event.target.classList.add("activeCategory");
    }
  };

  return props.categoryState.categories ? ( //after refactoring using (maptoprops) ==> boo need to use props
    <>
      <Box marginTop={"70px"}>
        <h3>Browse Our Categories: </h3>
        <Stack direction="row" spacing={2}>
          {props.categoryState.categories.map((category) => {
            return (
              <button
                key={`paper_${category.name}`}
                onClick={handleClick}
                elevation={4}
                className="categorySelector"
              >
                {category.display}
              </button>
            );
          })}{" "}
        </Stack>
      </Box>
    </>
  ) : null;
}

const mapStateToProps = (state) => ({
  productState: state.products,
  categoryState: state.categories,
  cartState: state.cart,
});
export default connect(mapStateToProps)(Categories);
