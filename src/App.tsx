import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import ProductList from "./components/ProductList.tsx";
import PageNotFound from "./components/PageNotFound.tsx";
import { CartProvider } from "./context/CartContext.tsx";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
