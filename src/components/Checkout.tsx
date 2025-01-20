import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="checkout">
      <div style={{ display: "flex", flexDirection: "row" }} >
        <button className="back-button" onClick={() => navigate("/")}>
          <FaArrowLeft size={50} />
        </button>
        <h1>Checkout</h1>
      </div>
      
      <div className="checkout-items">
        {cart.map((item, index) => (
          <div key={index} className="checkout-item">
            <img src={item.src} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>Quantidade: {item.quantity}</p>
              <p>Preço: R${item.price}</p>
              <p>Total: R${item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-total">
        <h2>Total: R${total}</h2>
      </div>
    </div>
  );
};

export default Checkout;