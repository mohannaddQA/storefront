const initialProductsState = {
  allProducts: [
    {
      category: "food",
      name: "Pasta",
      description: "1lb of delicious pasta for your meals",
      price: 2.99,
      stock: 1000,
    },
    {
      category: "food",
      name: "Fresh Vegetables",
      description: "Assorted fresh vegetables for a healthy diet",
      price: 5.99,
      stock: 1000,
    },
    {
      category: "electronics",
      name: "Smartphone",
      description: "A high-end smartphone with the latest features",
      price: 699.99,
      stock: 500,
    },
    {
      category: "electronics",
      name: "Laptop",
      description: "A powerful laptop for work and entertainment",
      price: 999.99,
      stock: 300,
    },
  ],
};

const productsReducer = (state = initialProductsState, action) => {
  // const { type, payload } = action;
  // switch(type){}
  switch (action.type) {
    case "FILTER_PRODUCTS":
    default:
      return state;
  }
};

export default productsReducer;
