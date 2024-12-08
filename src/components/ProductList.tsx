import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../hooks/useDebounce.ts";
import { useCart } from "../context/CartContext.tsx";
import { Product } from "../types/Product.ts";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then(({ data }) => {
        const fetchedProducts = data.slice(0, 20);
        setAllProducts(fetchedProducts);
        setProducts(fetchedProducts);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      setProducts(
        allProducts
          .filter(({ title }) =>
            title.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          .slice(0, 5)
      );
      setLoading(false);
    } else {
      setProducts(allProducts);
    }
  }, [debouncedSearch, allProducts]);

  return (
    <Box sx={{ padding: "2rem" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: "2rem" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", minHeight: "300px" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    height: 200,
                    objectFit: "contain",
                    padding: "1rem",
                    backgroundColor: "#f9f9f9",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{ textAlign: "center" }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    ₹{product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductList;