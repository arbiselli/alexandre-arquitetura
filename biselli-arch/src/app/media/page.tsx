"use client";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { useEffect, useState } from "react";
import { ArchitectureData } from "../architecture/architectureData";
import { MediaData } from "../media/mediaData";
import "./MediaPage.css";
import LoadingBar from "../components/LoadingBar";

export default function Media() {
  const [mediaData, setMediaData] = useState<MediaData[]>([]);
  const [architectureData, setArchitectureData] = useState<ArchitectureData[]>(
    []
  );
  const router = useRouter(); // Initialize useRouter

  const fetchData = async () => {
    try {
      const response = await fetch("/mediaData.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: MediaData[] = await response.json();
      setMediaData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchArchitectureData = async () => {
    try {
      const response = await fetch("/architectureData.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ArchitectureData[] = await response.json();
      setArchitectureData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchArchitectureData();
  }, []);

  return (
    <div>
      {
        <div className="media-container">
          {mediaData.length > 0 ? (
            mediaData.map((item, index) => (
              <div key={index} className="media-card-container">
                <div className="ano">{item.ano}</div>
                <div className="nome">{item.nome}</div>
                <div className="projeto-citado-container">
                  <div className="projeto-citado">Projeto Citado:</div>
                  {architectureData
                    .filter(
                      (architecture) => architecture.id === item.projetoCitado
                    )
                    .map((filteredItem) => (
                      <a
                        key={filteredItem.id}
                        className="link-arquitetura"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default anchor behavior
                          router.push(`/architecture/${filteredItem.id}`); // Navigate to the new URL
                        }}
                      >
                        {filteredItem.titulo}
                      </a>
                    ))}
                </div>

                <hr></hr>
              </div>
            ))
          ) : (
            <LoadingBar />
          )}
        </div>
      }
    </div>
  );
}
