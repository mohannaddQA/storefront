import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Paper, Typography } from "@mui/material";

function Categories(props) {
  /* --- this not a good practice but just for demo --> after this we send the state from the app level */
  const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    if (event.target.innerText === categories.activeCategory.display) {
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

  return props.categories ? (
    <>
      <Typography>Categories:</Typography>
      <Container id="categoryContainer">
        {props.categories.map((category) => {
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
        })}
        {/* <p>{categories.activeCategory.display}</p>      */}
      </Container>
    </>
  ) : null;
}

export default Categories;
