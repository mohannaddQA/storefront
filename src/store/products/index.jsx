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
/* */
export const fetchProducts = () => async (dispatch) => {
  let response = await fetch(
    "https://650b1fa7dfd73d1fab099ffb.mockapi.io/api/v1/products"
  );
  let data = await response.json();
  console.log(data);
  dispatch({
    type: "FETCH_PRODUCTS",
    payload: data,
  });
};

export const addItemToCart = (productId) => async (dispatch) => {
  let response = await fetch(
    `https://650b1fa7dfd73d1fab099ffb.mockapi.io/api/v1/products/${productId}`
  );
  let product = await response.json();

  if (product.stock <= 0) {
    console.error("Item is no longer in stock");
  } else {
    try {
      let body = { stock: product.stock - 1 };

      fetch(
        `https://650b1fa7dfd73d1fab099ffb.mockapi.io/api/v1/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        }
      )
        .then((response) => {
          console.log(response);
          dispatch({
            type: "ADD_TO_CART",
            payload: {
              id: product.id,
              category: product.category,
              name: product.name,
              description: product.description,
              price: product.price,
              quantity: 1,
            },
          });
        })
        .catch((err) => {
          console.log("Error making PUT request to update product stock", err);
        });
    } catch (e) {
      console.log("Could not make PUT request", e);
    }
  }
};
/* */
const productsReducer = (state = initialProductsState, action) => {
  // const { type, payload } = action;
  // switch(type){}
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
