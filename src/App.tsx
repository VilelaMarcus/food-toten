import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import ProductList from "./components/ProductList"; // Assumindo que você tem um componente ProductList
import "./styles/global.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Carousel />} />
          <Route path="/produtos/:category" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;