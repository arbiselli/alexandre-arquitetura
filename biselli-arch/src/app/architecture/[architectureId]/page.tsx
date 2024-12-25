"use client";
import { use, useEffect, useState } from "react";
import { ArchitectureData } from "../architectureData"; // Import the interface
import "./page.css"; // Import the CSS file

const ArchitectureDetail = ({
  params,
}: {
  params: Promise<{ architectureId: string }>;
}) => {
  const { architectureId } = use(params);
  const [data, setData] = useState<ArchitectureData | null>(null); // State to hold fetched data
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/architectureData.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const architectureData: ArchitectureData[] = await response.json();

      const fetchedData = architectureData.find(
        (item) => item.id === architectureId
      );

      setData(fetchedData || null); // Set the fetched data or null if not found
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData on component mount
  }, [architectureId]); // Run effect when 'architectureId' changes

  if (loading) {
    return <h1>Loading...</h1>; // Show loading state
  }

  if (!data) {
    return <h1>Architecture not found</h1>; // Handle case where ID does not exist
  }

  return (
    <body>
      <img
        src={data.imagemBase}
        alt={data.titulo}
        className="carousel-image" // Add a class for styling
      />
      <h1 className="title">{data.titulo}</h1>
      <div className="main-wrapper">
        <div className="left-wrapper">
          <p>
            LOCALIZAÇÃO: <br />
          </p>
          <div className="result">
            {data.localizacao}
          </div>
          <p>
            CLIENTE: <br />
          </p>
          <div className="result">
            {data.cliente}
          </div>
          <p>
            AREA: <br />
          </p>
          <div className="result">
            {data.area}
          </div>
          <p>
            TAMANHO: <br />
          </p>
          <div className="result">
            {data.tamanho}
          </div>
          <p>
            PROGRAMA: <br />
          </p>
          <div className="result">
            {data.programa}
          </div>
          <p>
            DESIGN: <br />
          </p>
          <div className="result">
            {data.design}
          </div>
          <p>
            CONSTRUÇÃO: <br />
          </p>
          <div className="result">
            {data.construcao}
          </div>
          <p>
            TIPO: <br />
          </p>
          <div className="result">
            {data.tipo}
          </div>
          <p>
            RECONHECIMENTO DE DESIGN: <br />
          </p>
          <div className="result">
            {data.reconhecimentoDesign}
          </div>
        </div>
        <div className="right-wrapper">
          <div className="descriptions">
            {/* <h2>{data.subtitulo}</h2> */}
            <p className="description-titles">
              Descrição <br />
            </p>
            <p className="description-content">
              {data.descricao}
            </p>
          </div>
          <div className="project-images">
            <p className="description-titles">Desenhos:</p>
            <div className="images">
              {data.imagens.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} />
              ))}
            </div>
            <p className="description-titles">Renderizações:</p>
            <div className="images">
              {data.desenhos.map((drawing, index) => (
                <img key={index} src={drawing} alt={`Drawing ${index + 1}`} />
              ))}
            </div>
            <p className="description-titles">Modelos:</p>
            <div className="images">
              {data.modelos.map((model, index) => (
                <img key={index} src={model} alt={`Model ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default ArchitectureDetail;
