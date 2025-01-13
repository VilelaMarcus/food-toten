import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import ProductList from "./components/ProductList";
import { CartProvider } from "./context/CartContext";
import "./styles/global.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Carousel />} />
            <Route path="/produtos/:category" element={<ProductList />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;