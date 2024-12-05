"use client"; // Ensure this is a client component

/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation"; // Correct import for useRouter
import React, { useEffect, useState } from "react";
import { ArchitectureData } from "../architecture/architectureData"; // Import the ArchitectureData interface
import "./Carousel.css"; // Ensure to import the CSS file

interface CarouselProps {
  data: ArchitectureData[]; // Use the ArchitectureData interface for the data prop
  onTitleClick: (id: string) => void; // New prop for handling title click
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const router = useRouter(); // Initialize useRouter
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

  return (
    <div className="carousel">
      <div className="carousel-slide">
        <img
          src={data[currentIndex].imagemBase}
          alt={data[currentIndex].titulo}
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
      </div>
      <p className="carousel-title">
        <a
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            router.push(`/architecture/${data[currentIndex].id}`); // Navigate to the new URL
          }}
        >
          {data[currentIndex].titulo}
        </a>
      </p>
    </div>
  );
};

export default Carousel;
