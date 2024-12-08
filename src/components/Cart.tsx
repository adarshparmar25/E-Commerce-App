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

interface CartPageProps {
  onClose: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ onClose }) => {
  const { cart, totalAmount, updateQuantity } = useCart();

  const renderCartItems = () =>
    cart.map((item) => (
      <Paper
        key={item.id}
        sx={{
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
          sx={{
            height: 100,
            width: 100,
            objectFit: "contain",
            borderRadius: "4px",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            Price: ₹{item.price.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginTop: "0.5rem", fontWeight: "bold" }}
          >
            Quantity: {item.quantity}
          </Typography>
          <Divider sx={{ marginY: "0.5rem" }} />
          <Box
            sx={{
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
                onClick={() => updateQuantity(item.id, item.quantity! - 1)}
                sx={{ marginRight: "0.5rem" }}
              >
                -
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => updateQuantity(item.id, item.quantity! + 1)}
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
      sx={{
        width: { xs: "100vw", sm: 400 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Typography variant="h5">Your Shopping Cart</Typography>
        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ padding: "1rem", flex: 1, overflowY: "auto" }}>
        {cart.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ marginTop: "2rem", textAlign: "center" }}
          >
            Your cart is empty. Start shopping now!
          </Typography>
        ) : (
          renderCartItems()
        )}
      </Box>

      <Box
        sx={{
          padding: "1rem",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ marginY: "1rem" }} />
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
          sx={{ marginTop: "1rem" }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
