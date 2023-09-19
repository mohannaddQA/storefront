import React from "react";
import { Container, Typography } from "@mui/material";
import Categories from "../Categories";

function Header(props) {
  return (
    <Container component="header" id="storeHeader">
      <Typography variant="h2" component="h2">
        Our Store
      </Typography>
    </Container>
  );
}

export default Header;
