import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "./Header.css";

export default function Header() {
  const { cartItemCount } = useCart();

  return (
    <header className="header">
      <h1>Totem de Pedidos</h1>
      <div className="cart-icon-container">
        <FaShoppingCart size={50} className="cart-icon" />
        {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
      </div>
    </header>
  );
}