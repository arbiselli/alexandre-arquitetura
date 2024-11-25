import React, { useEffect, useState } from "react";
import { ArchitectureData } from "../architecture/architectureData"; // Import the ArchitectureData interface
import "./Carousel.css"; // Ensure to import the CSS file

interface CarouselProps {
  data: ArchitectureData[]; // Use the ArchitectureData interface for the data prop
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [data.length]);

  // Check if data is available
  if (!data || data.length === 0) {
    return <div>No data available</div>; // Render a message if no data
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-slide">
        <img
          src={data[currentIndex].baseImage}
          alt={data[currentIndex].title}
          className="carousel-image" // Add a class for styling
        />
        <div className="carousel-dots">
          {data.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)} // Allow clicking on dots to change slide
            />
          ))}
        </div>
        <button className="arrow left-arrow" onClick={handlePrev}>
          &#10094; {/* Left arrow */}
        </button>
        <button className="arrow right-arrow" onClick={handleNext}>
          &#10095; {/* Right arrow */}
        </button>
      </div>
      <p className="carousel-title">{data[currentIndex].title}</p>
      <div className="carousel-description">
        <p>{data[currentIndex].description}</p>
      </div>
    </div>
  );
};

export default Carousel;
