import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "./ProductList.css";

const products = {
  salgados: [
    { id: 1, name: "Coxinha", price: 5, src: "../../public/assets/coxinha.jpg" },
    { id: 2, name: "Empada", price: 6, src: "../../public/assets/empada.jpg" },
    // Adicione mais produtos aqui
  ],
  bebidas: [
    { id: 1, name: "Refrigerante", price: 3, src: "../../public/assets/refrigerante.jpg" },
    { id: 2, name: "Suco", price: 4, src: "../../public/assets/suco.jpg" },
    // Adicione mais produtos aqui
  ],
  doces: [
    { id: 1, name: "Brigadeiro", price: 2, src: "../../public/assets/brigadeiro.jpg" },
    { id: 2, name: "Beijinho", price: 2, src: "../../public/assets/beijinho.jpg" },
    // Adicione mais produtos aqui
  ],
};

const ProductList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const categoryProducts = products[category] || [];

  return (
    <div className="product-list">
      <button className="back-button" onClick={() => navigate("/")}>
        <FaArrowLeft size={32} />
      </button>
      <h1>Produtos da categoria: {category}</h1>
      <div className="product-cards">
        {categoryProducts.map((product) => (
          <div key={product.id} className="product-card" onClick={() => addToCart(product)}>
            <img src={product.src} alt={product.name} />
            <h3>{product.name}</h3>
            <p>R${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;