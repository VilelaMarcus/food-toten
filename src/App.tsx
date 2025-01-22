import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import ProductList from "./components/ProductList";
import Checkout from "./components/Checkout";
import { CartProvider } from "./context/CartContext";
import "./styles/global.css";
import Payment from "./components/Payments";
import io from "socket.io-client";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

function App() {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("Conectado ao WebSocket!");
    });

    socket.on("new_shipment", (shipment) => {
      console.log("Remessa de salgados: ", shipment);
      toast.success("Nova remessa de produtos.");
    });

    return () => {
      socket.off("connect");
      socket.off("new_shipment");
      socket.disconnect();
    };
  });

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
          <ToastContainer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
