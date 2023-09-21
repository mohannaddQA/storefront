const initialCategoryState = {
  categories: [
    {
      name: "food",
      display: "food",
      description: "Food from all around the world",
    },
    {
      name: "electronics",
      display: "electronics",
      description: "labtobs , smartphones , electronic tools ...",
    },
  ],
  activeCategory: {},
};

export const fetchCategories = () => async (dispatch) => {
  let response = await fetch(
    "https://650b1fa7dfd73d1fab099ffb.mockapi.io/api/v1/categories"
  );
  let data = await response.json();

  dispatch({
    type: "FETCH_CATEGORIES",
    payload: data,
  });
};

const categoryReducer = (state = initialCategoryState, action) => {
  // const { type, payload } = action;
  // switch(type){}

  switch (action.type) {
    case "SET_ACTIVECATEGORY":
      let activeCategory = state.categories.find(
        (category) => category.display === action.payload
      ); //==> not realy adviced to put this logic here
      return {
        // the first val is the sent val
        categories: state.categories,
        activeCategory: activeCategory,
      };
    case "CLEAR_ACTIVECATEGORY":
      return {
        categories: state.categories,
        activeCategory: {},
      };
    case "FETCH_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
