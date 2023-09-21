const initialCartState = {
  items: [],
  total: 0,
  showCart: false,
};

export const removeItemFromCart = (product) => async (dispatch) => {
  let response = await fetch(
    `https://650b1fa7dfd73d1fab099ffb.mockapi.io/api/v1/products/${product.id}`
  );
  let foundProduct = await response.json();
  console.log("remove,", foundProduct);
  try {
    let body = { stock: foundProduct.stock + product.quantity };
    fetch(
      `https://650b1fa7dfd73d1fab099ffb.mockapi.io/api/v1/products/${product.id}`,
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
        console.log("remove2");
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: product,
        });
      })
      .catch((err) => {
        console.log("Error making PUT request to update product stock", err);
      });
  } catch (e) {
    console.log("Could not make PUT request", e);
  }
};

export const modifyCartItemQuantity =
  (product, quantityChange) => async (dispatch) => {
    // find cart item id in server products
    let response = await fetch(
      `https://650b1fa7dfd73d1fab099ffb.mockapi.io/api/v1/products/${product.id}`
    );
    let foundProduct = await response.json();
    console.log("after adding to cart", foundProduct);

    // if we are trying to increment an item's quantity in our cart AND the product is out of stock, then we throw an error
    if (quantityChange > 0 && foundProduct.stock <= 0) {
      throw new Error(
        "Unable to add more of this item to your cart. Item may be out of stock."
      );
    }

    // update server side stock
    try {
      let body = { stock: foundProduct.stock - quantityChange };
      fetch(
        `https://650b1fa7dfd73d1fab099ffb.mockapi.io/api/v1/products/${product.id}`,
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
            type: "MODIFY_ITEM_QUANTITY",
            payload: {
              product: product,
              quantityChange: quantityChange,
            },
          });
        })
        .catch((err) => {
          console.log("Error making PUT request to update product stock", err);
        });
    } catch (e) {
      console.log("Could not make PUT request", e);
    }
  };

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log("add to cart action triggered");
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case "REMOVE_FROM_CART":
      console.log("remove from cart triggered");
      let remainingItems = state.items.filter(
        (item) => item.name !== action.payload.name
      );

      let newTotal = remainingItems.reduce((acc, current) => {
        return acc + current.price * current.quantity;
      }, 0);

      return {
        ...state,
        items: remainingItems,
        total: newTotal,
      };
    case "MODIFY_ITEM_QUANTITY":
      let cartItems = [...state.items];

      let foundItem = cartItems.find(
        (item) => item.name === action.payload.product.name
      );

      foundItem.quantity += action.payload.quantityChange;

      if (foundItem.quantity === 0) {
        cartItems = state.items.filter(
          (item) => item.name !== action.payload.product.name
        );
      }

      let modifiedTotal = cartItems.reduce((acc, current) => {
        return acc + current.price * current.quantity;
      }, 0);

      return {
        ...state,
        items: cartItems,
        total: modifiedTotal,
      };
    case "TOGGLE_CART":
      console.log("showcart action trigered");
      return {
        ...state,
        showCart: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
