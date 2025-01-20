import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "./ProductList.css";

const products = {
  salgados: [
    { id: 1, name: "Coxinha", price: 5, src: "../../public/assets/salgados/coxinha.jpg" },
    { id: 2, name: "Empada", price: 5, src: "../../public/assets/salgados/empadas.jpg" },
    { id: 3, name: "Pao de Queijo", price: 5, src: "../../public/assets/salgados/pao.jpg" },
    // Adicione mais produtos aqui
  ],
  bebidas: [
    { id: 1, name: "Refrigerante", price: 5, src: "../../public/assets/bebidas/coca.jpg" },
    { id: 2, name: "Energetico", price: 5, src: "../../public/assets/bebidas/redbull.jpg" },
    { id: 3, name: "SUco", price: 5, src: "../../public/assets/bebidas/suco.jpg" },
    // Adicione mais produtos aqui
  ],
  doces: [
    { id: 3, name: "BEijinho", price: 5, src: "../../public/assets/doces/beijinho.jpg" },
    { id: 3, name: "Brigadeiro", price: 5, src: "../../public/assets/doces/brigadeiro.jpg" },
    { id: 3, name: "Trento", price: 5, src: "../../public/assets/doces/trento.jpg" },
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