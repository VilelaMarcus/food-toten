import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductList.css";

type Category = "salgados" | "bebidas" | "doces";

const products: Record<
  Category,
  { id: number; name: string; price: number; src: string }[]
> = {
  salgados: [
    {
      id: 1,
      name: "Coxinha",
      price: 5,
      src: "../../public/assets/salgados/coxinha.jpg",
    },
    {
      id: 2,
      name: "Empada",
      price: 5,
      src: "../../public/assets/salgados/empadas.jpg",
    },
    {
      id: 3,
      name: "Pao de Queijo",
      price: 5,
      src: "../../public/assets/salgados/pao.jpg",
    },
    // Adicione mais produtos aqui
  ],
  bebidas: [
    {
      id: 1,
      name: "Refrigerante",
      price: 5,
      src: "../../public/assets/bebidas/coca.jpg",
    },
    {
      id: 2,
      name: "Energetico",
      price: 5,
      src: "../../public/assets/bebidas/redbull.jpg",
    },
    {
      id: 3,
      name: "Suco",
      price: 5,
      src: "../../public/assets/bebidas/suco.jpg",
    },
    // Adicione mais produtos aqui
  ],
  doces: [
    {
      id: 3,
      name: "Beijinho",
      price: 5,
      src: "../../public/assets/doces/beijinho.jpg",
    },
    {
      id: 3,
      name: "Brigadeiro",
      price: 5,
      src: "../../public/assets/doces/brigadeiro.jpg",
    },
    {
      id: 3,
      name: "Trento",
      price: 5,
      src: "../../public/assets/doces/trento.png",
    },
    // Adicione mais produtos aqui
  ],
};

const ProductList = () => {
  const { category } = useParams<{ category: string }>();
  const categoryProducts = category ? products[category as Category] : [];
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="product-list">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button className="back-button" onClick={() => navigate("/")}>
          <FaArrowLeft size={50} />
        </button>
        <h1>Produtos da categoria: {category}</h1>
      </div>
      <div className="product-cards">
        {categoryProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => {
              addToCart({ ...product, quantity: 1 });
              toast.success(`${product.name} adicionado ao carrinho.`);
            }}
          >
            <img src={product.src} alt={product.name} />
            <h3>{product.name}</h3>
            <p>R${product.price}</p>
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductList;
