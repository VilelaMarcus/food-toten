import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";

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
  { src: "../../public/assets/doce.jpg", title: "DOCES", category: "doces" },
];

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

export default function Carousel() {
  const navigate = useNavigate();

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
      console.log("Remessa de salgados: ", shipment);
    });

    return () => {
      socket.off("connect");
      socket.off("new_shipment");
      socket.disconnect();
    };
  });

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
    </div>
  );
}
