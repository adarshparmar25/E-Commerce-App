import React from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  CardMedia,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContext.tsx";

function Cart({ onClose }) {
  const { cart, totalAmount, updateQuantity } = useCart();

  const renderCartItems = () =>
    cart.map((item) => (
      <Paper
        key={item.id}
        style={{
          padding: "1rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <CardMedia
          component="img"
          image={item.image}
          alt={item.title}
          style={{
            height: 100,
            width: 100,
            objectFit: "contain",
            borderRadius: "4px",
          }}
        />
        <Box style={{ flex: 1 }}>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            Price: ₹{item.price.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            style={{ marginTop: "0.5rem", fontWeight: "bold" }}
          >
            Quantity: {item.quantity}
          </Typography>
          <Divider style={{ margin: "0.5rem 0" }} />
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              ₹{(item.price * (item.quantity || 1)).toFixed(2)}
            </Typography>
            <Box>
              <Button
                size="small"
                variant="outlined"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{ marginRight: "0.5rem" }}
              >
                -
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    ));

  return (
    <Box
      style={{
        width: "100vw",
        maxWidth: 400,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "#3f51b5",
          color: "white",
        }}
      >
        <Typography variant="h5">Your Shopping Cart</Typography>
        <IconButton onClick={onClose} style={{ color: "inherit" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box style={{ padding: "1rem", flex: 1, overflowY: "auto" }}>
        {cart.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            style={{ marginTop: "2rem", textAlign: "center" }}
          >
            Your cart is empty. Start shopping now!
          </Typography>
        ) : (
          renderCartItems()
        )}
      </Box>

      <Box
        style={{
          padding: "1rem",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Order Summary
        </Typography>
        <Divider style={{ margin: "1rem 0" }} />
        <Typography variant="body1" gutterBottom>
          Total Items:{" "}
          {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        </Typography>
        <Typography variant="body1" fontWeight="bold" gutterBottom>
          Total Amount: ₹{totalAmount.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
}

export default Cart;
