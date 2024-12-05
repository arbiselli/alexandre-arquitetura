"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArchitectureData } from "../architecture/architectureData";
import Carousel from "../components/Carousel";
import "./ArchitecturePage.css";

export default function ArchitecturePage() {
  const [filteredData, setFilteredData] = useState<ArchitectureData[]>([]);
  const searchParams = useSearchParams();

  const fetchData = async () => {
    try {
      const response = await fetch("/architectureData.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ArchitectureData[] = await response.json();
      setFilteredData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const query: string | null = searchParams.get("q");

  const filteredArchitectures = filteredData.filter((item) => {
    if (query === "residential") {
      return item.tipo.toLowerCase() === "residencial";
    } else if (query === "others") {
      return item.tipo.toLowerCase() !== "residencial";
    }
    return false;
  });

  return (
    <div>
      {query ? (
        <div className="architecture-container">
          <div className="card-container">
            {filteredArchitectures.length > 0 ? (
              filteredArchitectures.map((item) => (
                <div className="card" key={item.id}>
                  <img
                    src={item.imagemBase}
                    alt={item.titulo}
                    className="card-image"
                  />
                  <h2>{item.titulo}</h2>
                </div>
              ))
            ) : (
              <p>No architectures found.</p>
            )}
          </div>
        </div>
      ) : (
        <Carousel data={filteredData} onTitleClick={() => {}} />
      )}
    </div>
  );
}
