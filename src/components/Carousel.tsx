import { type ReactNode, useRef } from "react";
import "../styles/Carousel.css";

interface CarouselProps {
  children: ReactNode;
  title?: string;
}

export const Carousel = ({ children, title }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="carousel-container">
      {title && <h2 className="carousel-container__title">{title}</h2>}
      <div className="carousel">
        <button
          className="carousel__arrow carousel__arrow--left"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          ←
        </button>
        <div className="carousel__track" ref={carouselRef}>
          {children}
        </div>
        <button
          className="carousel__arrow carousel__arrow--right"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>
  );
};
