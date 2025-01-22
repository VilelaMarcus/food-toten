import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProducts } from "../context/ProductContext";

// Mapeamento dos produtos recebidos via WebSocket
const productDataMap: Record<
  number,
  {
    name: string;
    value: number;
    description: string;
    categoryId: number;
    src: string;
  }
> = {
  1: {
    name: "Coxinha",
    value: 5,
    description: "Salgado frito, com recheio de frango e catupiry.",
    categoryId: 2,
    src: "../../public/assets/salgados/coxinha.jpg",
  },
  2: {
    name: "Empada",
    value: 5,
    description: "Salgado assado.",
    categoryId: 2,
    src: "../../public/assets/salgados/empadas.jpg",
  },
  3: {
    name: "Pão de Queijo",
    value: 5,
    description: "Salgado assado.",
    categoryId: 2,
    src: "../../public/assets/salgados/pao.jpg",
  },
};

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

const slides = [
  {
    src: "../../public/assets/comida.jpg",
    title: "SALGADOS",
    category: "salgados",
  },
  {
    src: "../../public/assets/bebida.jpg",
    title: "BEBIDAS",
    category: "bebidas",
  },
  {
    src: "../../public/assets/doce.jpg",
    title: "DOCES",
    category: "doces",
  },
];

export default function Carousel() {
  const navigate = useNavigate();
  const { addShipment } = useProducts();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleCategoryDoubleClick = (category: string) => {
    navigate(`/produtos/${category}`);
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("Conectado ao WebSocket!");
    });

    socket.on("new_shipment", (shipment) => {
      console.log("Nova remessa recebida:", shipment);

      // Verifica se o productId recebido está no mapeamento
      if (productDataMap[shipment.productId]) {
        const productInfo = productDataMap[shipment.productId];

        const newProduct = {
          id: shipment.productId,
          name: productInfo.name,
          value: productInfo.value,
          description: productInfo.description,
          categoryId: productInfo.categoryId,
          quantity: shipment.quantity, // Quantidade vinda do backend
          src: productInfo.src,
        };

        addShipment([newProduct]); // Adiciona ao contexto de produtos

        toast.success(
          `${productInfo.name} - Nova remessa adicionada: ${shipment.quantity} unidades`
        );
      } else {
        toast.error("Produto não reconhecido");
      }
    });

    return () => {
      socket.off("connect");
      socket.off("new_shipment");
      socket.disconnect();
    };
  }, [addShipment]);

  return (
    <div className="carousel">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide"
            onDoubleClick={() => handleCategoryDoubleClick(slide.category)}
          >
            <img src={slide.src} alt={`Slide ${index + 1}`} />
            <h3>{slide.title}</h3>
          </div>
        ))}
      </Slider>
      <ToastContainer />
    </div>
  );
}
