import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import ProductList from "./components/ProductList";
import Checkout from "./components/Checkout";
import { CartProvider } from "./context/CartContext";
import "./styles/global.css";
import Payment from "./components/Payments";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Carousel />} />
            <Route path="/produtos/:category" element={<ProductList />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
