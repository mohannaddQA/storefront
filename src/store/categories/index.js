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

const categoryReducer = (state = initialCategoryState, action) => {
  // const { type, payload } = action;
  // switch(type){}

  switch (action.type) {
    case "SET_ACTIVECATEGORY":
      let activeCategory = state.categories.find(
        (category) => category.display === action.payload
      );
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
    default:
      return state;
  }
};

export default categoryReducer;
