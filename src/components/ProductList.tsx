import React from "react";
import { useParams } from "react-router-dom";

const ProductList = () => {
  const { category } = useParams();

  return (
    <div>
      <h1>Produtos da categoria: {category}</h1>
      {/* Adicione a lógica para listar os produtos aqui */}
    </div>
  );
};

export default ProductList;