"use client";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";

export default function ArchitecturePage() {
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/architectureData.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFilteredData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Carousel data={filteredData} />;
}
