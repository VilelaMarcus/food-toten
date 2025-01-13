import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const cartItemCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};