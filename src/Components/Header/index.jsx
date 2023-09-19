import React from "react";
import { Container, Typography } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import Menu from "@mui/material/Menu";
function Header(props) {
  const handleCartButtonClick = (event) => {};

  const handleClose = () => {};
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
            {`CART (${"cartCount"})`}
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
