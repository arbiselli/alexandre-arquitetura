"use client";
import { use, useEffect, useState } from "react";
import { ArchitectureData } from "../architectureData"; // Import the interface
import "./page.css"; // Import the CSS file
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

const ArchitectureDetail = ({
  params,
}: {
  params: Promise<{ architectureId: string }>;
}) => {
  const { architectureId } = use(params);
  const [data, setData] = useState<ArchitectureData | null>(null); // State to hold fetched data
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showModalImage, setShowModalImage] = useState<boolean>(false);

  // Function to go back to the previous page
  const goBack = () => {
    router.back();
  };

  // Function to open the modal
  const openModal = (image: string, index: number) => {
    setShowModalImage(false);
    setTimeout(() => {
      setModalImage(image);
      setCurrentImageIndex(index);
      setTimeout(() => {
        setShowModalImage(true);
      }, 10); // Ensure state is set after image is set
    }, 10); // Reduced delay for smoother transition
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModalImage(false);
    setTimeout(() => {
      setModalImage(null);
    }, 500);
  };

  // Function to show the previous image
  const showPreviousImage = () => {
    if (data) {
      setShowModalImage(false);
      setTimeout(() => {
        const newIndex = (currentImageIndex - 1 + data.imagens.length) % data.imagens.length;
        setModalImage(data.imagens[newIndex]);
        setCurrentImageIndex(newIndex);
        setShowModalImage(true);
      }, 500);
    }
  };

  // Function to show the next image
  const showNextImage = () => {
    if (data) {
      setShowModalImage(false);
      setTimeout(() => {
        const newIndex = (currentImageIndex + 1) % data.imagens.length;
        setModalImage(data.imagens[newIndex]);
        setCurrentImageIndex(newIndex);
        setShowModalImage(true);
      }, 500);
    }
  };

  // Handle keyboard events for navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (modalImage) {
        if (event.key === "ArrowLeft") {
          showPreviousImage();
        } else if (event.key === "ArrowRight") {
          showNextImage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalImage, currentImageIndex, data]);

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
    <div className="body-architecture">
      <button
        onClick={modalImage ? closeModal : goBack}
        className={modalImage ? "modal-close-button" : "close-button"}
      />
      <div className="image-container">
        <img
          src={data.imagemBase}
          alt={data.titulo}
          className="main-image" // Add a class for styling
        />
      </div>
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
            <div className="project-images-wrapper">
              <p className="description-titles">Desenhos:</p>
              <div className="images">
                {data.imagens.map((image, index) => (
                  <img key={index} src={image} className="image" alt={`Image ${index + 1}`} onClick={() => openModal(image, index)} />
                ))}
              </div>
            </div>
            <div className="project-images-wrapper">
              <p className="description-titles">Renderizações:</p>
              <div className="images">
                {data.desenhos.map((drawing, index) => (
                  <img key={index} src={drawing} className="image" alt={`Drawing ${index + 1}`} onClick={() => openModal(drawing, index)} />
                ))}
              </div>
            </div>
            <div className="project-images-wrapper">
              <p className="description-titles">Modelos:</p>
              <div className="images">
                {data.modelos.map((model, index) => (
                  <img key={index} src={model} className="image" alt={`Model ${index + 1}`} onClick={() => openModal(model, index)} />
                ))}
              </div>
            </div>
          </div>
          <div className="slider-controls">
            <button onClick={showPreviousImage} className="slider-arrow left-arrow"/>
            <button onClick={showNextImage} className="slider-arrow right-arrow"/>
          </div>
        </div>
      </div>
      {modalImage && (
        <div className={classNames("modal", { show: showModalImage })}>
          <button onClick={showPreviousImage} className="modal-arrow left-arrow"/>
          <img className="modal-content" src={modalImage} alt="Modal" />
          <button onClick={showNextImage} className="modal-arrow right-arrow"/>
        </div>
      )}
    </div>
  );
};

export default ArchitectureDetail;