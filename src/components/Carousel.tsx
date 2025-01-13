import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import { useNavigate } from "react-router-dom"; // Assumindo que você está usando react-router

const slides = [
  { src: "../../public/assets/comida.jpg", title: "SALGADOS", category: "salgados" },
  { src: "../../public/assets/bebida.jpg", title: "BEBIDAS", category: "bebidas" },
  { src: "../../public/assets/doce.jpg", title: "DOCES", category: "doces" }
];

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