import React, { useEffect } from "react";
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
import { addItemToCart, fetchProducts } from "../../store/products";
import { modifyCartItemQuantity } from "../../store/cart";

function Products(props) {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    if (!props.cartState.items.find((item) => item.id === product.id)) {
      dispatch(addItemToCart(product.id));
    }
    // otherwise, the product IS in the cart and we need to update the quantity of the item
    else {
      dispatch(modifyCartItemQuantity(product, 1));
    }
  };

  // fetches product data when component mounts (when page loads)
  useEffect(() => {
    dispatch(fetchProducts());
    console.log("fetchproducts");
  }, []);

  // fetches product data from the server any time our cart is modified so that the state stays in sync with whats on the server
  useEffect(() => {
    dispatch(fetchProducts());
  }, [props.cartState]);
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
