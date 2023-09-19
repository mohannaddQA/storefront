import React from "react";
import { connect } from "react-redux";
// import { useSelector } from "react-redux";  // this is when for accessing the state using use selector

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

function Products(props) {
  /*accessing the state using the use selector */
  // if you use this way ==> no need to use props.productState and we need to dend it from the app level

  //   const productState = useSelector(
  //     (storefrontState) => storefrontState.products
  // or (state) => state.products
  //   );
  //   const categoryState = useSelector(
  //     (storefrontState) => storefrontState.categories
  //  or (state) => state.categories
  //   );

  /* ------------------------------------------- */

  return (
    <Container key="productsContainer" id="productsContainer">
      {props.categoryState.activeCategory.name
        ? props.productState.allProducts.map((product) => {
            if (product.category === props.categoryState.activeCategory.name) {
              return (
                <Card
                  key={`${product.name}_card`}
                  sx={{ width: 300, height: 300, margin: "1rem" }}
                >
                  <CardHeader title={product.name} subheader={product.price} />
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
                    <Button variant="contained">Add To Cart</Button>
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
                <CardHeader title={product.name} subheader={product.price} />
                <CardMedia
                  sx={{ height: 100 }}
                  image="https://placehold.co/200.png"
                />
                <CardContent>
                  <Typography variant="body2">{product.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained">Add To Cart</Button>
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
});
export default connect(mapStateToProps)(Products);
