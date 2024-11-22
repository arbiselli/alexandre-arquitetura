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

  return (
    <div className="carousel">
      {data.length > 0 && (
        <div className="carousel-slide">
          <h2>{data[currentIndex].title}</h2> {/* Use title for the heading */}
          <p>{data[currentIndex].description}</p>{" "}
          {/* Optional: Display description */}
          <img
            src={data[currentIndex].baseImage}
            alt={data[currentIndex].title}
            className="carousel-image" // Add a class for styling
          />
        </div>
      )}
      <div className="carousel-dots">
        {data.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)} // Allow clicking on dots to change slide
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
