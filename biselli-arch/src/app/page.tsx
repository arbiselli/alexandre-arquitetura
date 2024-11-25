"use client";
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel"; // Adjust the import path if necessary

const HomePage = () => {
  const [carouselData, setCarouselData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/architectureData.json"); // Adjust the path to your data source
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCarouselData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Carousel data={carouselData} />;
};

export default HomePage;
