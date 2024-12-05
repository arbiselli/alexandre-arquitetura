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

      console.log(architectureId);
      console.log(fetchedData);
      console.log(architectureData);
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
    <body className="main-wrapper">
      <div className="left-wrapper">
        <h1>{data.titulo}</h1>
        <p>
          LOCALIZAÇÃO: <br />
        </p>
        {data.localizacao}
        <p>
          CLIENTE: <br />
        </p>
        {data.cliente}
        <p>
          AREA: <br />
        </p>
        {data.area}
        <p>
          TAMANHO: <br />
        </p>
        {data.tamanho}
        <p>
          PROGRAMA: <br />
        </p>
        {data.programa}
        <p>
          DESIGN: <br />
        </p>
        {data.design}
        <p>
          CONSTRUÇÃO: <br />
        </p>
        {data.construcao}
        <p>
          TIPO: <br />
        </p>
        {data.tipos}
        <p>
          RECONHECIMENTO DE DESIGN: <br />
        </p>
        {data.reconhecimentoDesign}
      </div>

      <div className="right-wrapper">
        <div className="descriptions">
          <h2>{data.subtitulo}</h2>
          <p>
            Descrição <br />
            {data.descricao}
          </p>
        </div>
        <div className="project-images">
          <p>Imagens: </p>
          <br />
          <div className="images"></div>
          <p>Desenhos: </p>
          <br />
          <div className="images"></div>
          <p>Modelos: </p>
          <br />
          <div className="images"></div>
        </div>
      </div>
      <p>sustentabilidade: {data.sustentabilidade}</p>

      <h2>imagens</h2>
      {data.imagens.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index + 1}`} />
      ))}

      <h2>desenhos</h2>
      {data.desenhos.map((drawing, index) => (
        <img key={index} src={drawing} alt={`Drawing ${index + 1}`} />
      ))}

      <h2>modelos</h2>
      {data.modelos.map((model, index) => (
        <img key={index} src={model} alt={`Model ${index + 1}`} />
      ))}
    </body>
  );
};

export default ArchitectureDetail;
