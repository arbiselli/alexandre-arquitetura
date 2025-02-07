"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArchitectureData } from "../architecture/architectureData";
import Carousel from "../components/Carousel";
import "./ArchitecturePage.css";
import LoadingBar from "../components/LoadingBar";

export default function ArchitecturePage() {
  const [filteredData, setFilteredData] = useState<ArchitectureData[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize useRouter
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
    <div className="architecture-container">
      {query ? (
        <div>
          <div className="card-container">
            {filteredArchitectures.length > 0 ? (
              filteredArchitectures.map((item) => (
                <div className="card" key={item.id}>
                  <img
                    src={item.imagemBase}
                    alt={item.titulo}
                    className="card-image"
                  />
                  <h2
                    onClick={() => router.push(`/architecture/${item.id}`)}
                    className="card-title" // Add CSS class
                  >
                    {item.titulo}
                  </h2>
                </div>
              ))
            ) : (
              <LoadingBar />
            )}
          </div>
        </div>
      ) : (
        <Carousel data={filteredData} onTitleClick={() => { }} />
      )}
    </div>
  );
}
