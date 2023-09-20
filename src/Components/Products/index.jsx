import React from "react";
import { connect } from "react-redux";
// import { useSelector } from "react-redux";  // this is when for accessing the state using use selector
import "./index.css";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
  Container,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
function Products(props) {
  /*accessing the state using the use selector */
  // if you use this way ==> no need to use props.productState and we need to dend it from the app level // not sure about this

  //   const productState = useSelector(
  //     (storefrontState) => storefrontState.products
  // or (state) => state.products
  //   );
  //   const categoryState = useSelector(
  //     (storefrontState) => storefrontState.categories
  //  or (state) => state.categories
  //   );

  /* ------------------------------------------- */
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    let foundProduct = props.productState.allProducts.find(
      (item) => item.name === product.name
    );
    console.log(product);
    // if product is in stock, update the number of products in stock
    if (foundProduct.stock > 0) {
      dispatch({
        type: "UPDATE_STOCK",
        payload: {
          name: foundProduct.name,
          quantity: 1,
        },
      });
      console.log(props);
      // after stock has been updated, either add a new item to the cart or modify the cart item's quantity if the item is already in the cart
      for (let i = 0; i < props.cartState.items.length; i++) {
        if (props.cartState.items[i].name === product.name) {
          dispatch({
            type: "MODIFY_QUANTITY",
            payload: {
              name: product.name,
              quantity: 1,
            },
          });
          // prevents code from further executing
          return;
        }
      }

      dispatch({
        type: "ADD_TO_CART",
        payload: {
          category: product.category,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: 1,
        },
      });
    }
  };
  return (
    <Container
      key="productsContainer"
      id="productsContainer"
      className="products-container"
    >
      <h2>{props.categoryState.activeCategory.name}</h2> <br />
      {props.categoryState.activeCategory.name
        ? props.productState.allProducts.map((product) => {
            if (product.category === props.categoryState.activeCategory.name) {
              return (
                <Card
                  key={`${product.name}_card`}
                  sx={{ width: 300, height: 300, margin: "1rem" }}
                >
                  <CardHeader
                    title={product.name}
                    subheader={`$${product.price}`}
                  />
                  <CardMedia
                    sx={{ height: 100 }}
                    image="https://placehold.co/200.png"
                  />
                  <CardContent>
                    <Typography variant="body2">
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {product.stock > 0 ? (
                      <Button
                        variant="contained"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </Button>
                    ) : (
                      <Button disabled variant="contained">
                        Out of Stock
                      </Button>
                    )}
                  </CardActions>
                </Card>
              );
            }
            return null;
          })
        : props.productState.allProducts.map((product) => {
            return (
              <Card
                key={`${product.name}_card`}
                sx={{ width: 300, height: 300, margin: "1rem" }}
              >
                <CardHeader
                  title={product.name}
                  subheader={`$${product.price}`}
                />
                <CardMedia
                  sx={{ height: 100 }}
                  image="https://placehold.co/200.png"
                />
                <CardContent>
                  <Typography variant="body2">{product.description}</Typography>
                </CardContent>
                <CardActions>
                  {product.stock > 0 ? (
                    <Button
                      variant="contained"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add To Cart
                    </Button>
                  ) : (
                    <Button disabled variant="contained">
                      Out of Stock
                    </Button>
                  )}
                </CardActions>
              </Card>
            );
          })}
    </Container>
  );
}
/*accessing the state using mapToProps */
const mapStateToProps = (state) => ({
  productState: state.products,
  categoryState: state.categories,
  cartState: state.cart,
});
export default connect(mapStateToProps)(Products);
