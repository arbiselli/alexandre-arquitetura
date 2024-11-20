"use client";

import { use, useEffect, useState } from "react";

interface ArchitectureData {
  baseImage: string;
  title: string;
  location: string;
  client: string;
  siteArea: string;
  size: string;
  program: string;
  design: string;
  construction: string;
  type: string;
  team: string;
  consultants: string;
  designRecognition: string;
  bibliography: string;
  description: string;
  sustainability: string;
  images: string[];
  drawings: string[];
  models: string[];
}

const ArchitectureDetail = ({
  params,
}: {
  params: Promise<{ architectureId: string }>;
}) => {
  const { architectureId } = use(params);
  const [data, setData] = useState<ArchitectureData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulated data fetching (replace this with actual data fetching logic)
      const architectureData: { [key: string]: ArchitectureData } = {
        1: {
          baseImage: "url_to_base_image_1.jpg",
          title: "Architecture 1",
          location: "Location 1",
          client: "Client 1",
          siteArea: "2000 m²",
          size: "500 m²",
          program: "Residential",
          design: "Modern",
          construction: "Completed",
          type: "Building",
          team: "Team A",
          consultants: "Consultant A",
          designRecognition: "Award 1",
          bibliography: "Reference 1",
          description: "Description of Architecture 1.",
          sustainability: "LEED Certified",
          images: ["url_to_image_1.jpg", "url_to_image_2.jpg"],
          drawings: ["url_to_drawing_1.jpg"],
          models: ["url_to_model_1.jpg"],
        },
        2: {
          baseImage: "url_to_base_image_2.jpg",
          title: "Architecture 2",
          location: "Location 2",
          client: "Client 2",
          siteArea: "3000 m²",
          size: "700 m²",
          program: "Commercial",
          design: "Contemporary",
          construction: "Ongoing",
          type: "Office",
          team: "Team B",
          consultants: "Consultant B",
          designRecognition: "Award 2",
          bibliography: "Reference 2",
          description: "Description of Architecture 2.",
          sustainability: "BREEAM Certified",
          images: ["url_to_image_3.jpg", "url_to_image_4.jpg"],
          drawings: ["url_to_drawing_2.jpg"],
          models: ["url_to_model_2.jpg"],
        },
      };

      // Simulate an async operation (e.g., fetching from an API)
      if (architectureId) {
        const fetchedData = architectureData[architectureId] || null;
        setData(fetchedData);
      }
      setLoading(false);
    };

    fetchData();
  }, [architectureId]); // Run effect when 'architectureId' changes

  if (loading) {
    return <h1>Loading...</h1>; // Show loading state
  }

  if (!data) {
    return <h1>Architecture not found</h1>; // Handle case where ID does not exist
  }

  return (
    <div>
      <img src={data.baseImage} alt={data.title} />
      <h1>{data.title}</h1>
      <p>
        <strong>Location:</strong> {data.location}
      </p>
      <p>
        <strong>Client:</strong> {data.client}
      </p>
      <p>
        <strong>Site Area:</strong> {data.siteArea}
      </p>
      <p>
        <strong>Size:</strong> {data.size}
      </p>
      <p>
        <strong>Program:</strong> {data.program}
      </p>
      <p>
        <strong>Design:</strong> {data.design}
      </p>
      <p>
        <strong>Construction:</strong> {data.construction}
      </p>
      <p>
        <strong>Type:</strong> {data.type}
      </p>
      <p>
        <strong>Team:</strong> {data.team}
      </p>
      <p>
        <strong>Consultants:</strong> {data.consultants}
      </p>
      <p>
        <strong>Design Recognition:</strong> {data.designRecognition}
      </p>
      <p>
        <strong>Bibliography:</strong> {data.bibliography}
      </p>
      <p>
        <strong>Description:</strong> {data.description}
      </p>
      <p>
        <strong>Sustainability:</strong> {data.sustainability}
      </p>

      <h2>Images</h2>
      {data.images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index + 1}`} />
      ))}

      <h2>Drawings</h2>
      {data.drawings.map((drawing, index) => (
        <img key={index} src={drawing} alt={`Drawing ${index + 1}`} />
      ))}

      <h2>Models</h2>
      {data.models.map((model, index) => (
        <img key={index} src={model} alt={`Model ${index + 1}`} />
      ))}
    </div>
  );
};

export default ArchitectureDetail;
