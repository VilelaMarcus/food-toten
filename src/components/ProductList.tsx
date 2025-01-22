import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductList.css";
import { useEffect } from "react";

const ProductList = () => {
  const { category } = useParams<{ category: string }>();
  const { products, sellProduct } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Mapeamento de categorias para IDs
  const categoryMap: Record<string, number> = {
    salgados: 2,
    bebidas: 1,
    doces: 3,
  };

  // Garantir que a categoria seja válida e filtrada corretamente
  const categoryProducts = category
    ? products.filter(
        (product) => product.categoryId === categoryMap[category.toLowerCase()]
      )
    : [];

  const handleAddToCart = (
    productId: number,
    productName: string,
    price: number
  ) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.quantity > 0) {
      addToCart({
        id: product.id,
        name: productName,
        price,
        quantity: 1,
        src: product.src,
      });

      sellProduct(productId, 1); // Diminui a quantidade do produto disponível
      toast.success(`${productName} adicionado ao carrinho.`);
    } else {
      toast.error(`Produto ${productName} esgotado.`);
    }
  };

  useEffect(() => console.log("TESTE 321: ", products));

  return (
    <div className="product-list">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button className="back-button" onClick={() => navigate("/")}>
          <FaArrowLeft size={50} />
        </button>
        <h1>Produtos da categoria: {category}</h1>
      </div>
      <div className="product-cards">
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <div
              key={product.id}
              className={`product-card ${
                product.quantity === 0 ? "out-of-stock" : ""
              }`}
              onClick={() =>
                handleAddToCart(product.id, product.name, product.value)
              }
            >
              <img src={product.src} alt={product.name} />
              <h3>{product.name}</h3>
              <p>R${product.value.toFixed(2)}</p>
              <p>Disponível: {product.quantity} unidade(s)</p>
            </div>
          ))
        ) : (
          <p className="empty-message">
            Nenhum produto disponível nesta categoria.
          </p>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductList;
