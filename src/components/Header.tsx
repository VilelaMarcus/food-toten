import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <h1>Totem de Pedidos</h1>
      <FaShoppingCart size={24} className="cart-icon" />
    </header>
  );
}
