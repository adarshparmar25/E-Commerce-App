import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext.tsx";
import CartPage from "./Cart.tsx";

function Navbar() {
  const { cart } = useCart();
  const [isCartOpen, setCartOpen] = useState(false);

  const cartCount = cart.reduce(
    (total, { quantity }) => total + (quantity || 1),
    0
  );

  return (
    <>
      <AppBar position="static" color="primary" style={{ padding: "0 2rem" }}>
        <Toolbar>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            E-Commerce App
          </Typography>
          <IconButton color="inherit" onClick={() => setCartOpen(true)}>
            <ShoppingCartIcon />
            <Badge badgeContent={cartCount} color="error" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setCartOpen(false)}
      >
        <CartPage onClose={() => setCartOpen(false)} />
      </Drawer>
    </>
  );
}

export default Navbar;
