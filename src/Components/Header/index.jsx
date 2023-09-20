import React from "react";
import { Container, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";

function Header(props) {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cartState);
  const handleCartButtonClick = () => {
    dispatch({
      type: "TOGGLE_CART",
      payload: !cartState.showCart,
    });
  };
  let itemsCount = 0;
  for (let i = 0; i < cartState.items.length; i++) {
    itemsCount += cartState.items[i].quantity;
  }

  return (
    <Container component="header" id="storeHeader">
      <AppBar component="nav" sx={{ backgroundColor: "#F5F5F5" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
                color: "#000000",
                fontSize: "35px",
              },
            }}
          >
            OUR STORE
          </Typography>

          <Button sx={{ color: "#000000" }} onClick={handleCartButtonClick}>
            {`CART (${itemsCount})`}
          </Button>
          <Menu
            id="cart-menu"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          ></Menu>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
export default Header;
