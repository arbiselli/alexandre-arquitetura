"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

// Sample architecture data
const architectureData: { [key: string]: ArchitectureData } = {
  1: {
    baseImage: "url_to_base_image_1.jpg",
    title: "Architecture A",
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
    description: "Description of Architecture A.",
    sustainability: "LEED Certified",
    images: ["url_to_image_1.jpg", "url_to_image_2.jpg"],
    drawings: ["url_to_drawing_1.jpg"],
    models: ["url_to_model_1.jpg"],
  },
  2: {
    baseImage: "url_to_base_image_2.jpg",
    title: "Architecture B",
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
    description: "Description of Architecture B.",
    sustainability: "BREEAM Certified",
    images: ["url_to_image_3.jpg", "url_to_image_4.jpg"],
    drawings: ["url_to_drawing_2.jpg"],
    models: ["url_to_model_2.jpg"],
  },
  // Add more architecture data as needed
};

const ArchitectureAZ = () => {
  const [filteredData, setFilteredData] = useState<ArchitectureData[]>([]);
  const searchParams = useSearchParams();
  const letter = searchParams.get("q"); // Get the letter from the query parameter

  useEffect(() => {
    if (letter) {
      const filtered = Object.values(architectureData).filter(
        (item) => item.title.startsWith(letter.toUpperCase()) // Ensure the letter is uppercase
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]); // Reset if no letter is provided
    }
  }, [letter]); // Run effect when the letter changes

  return (
    <div>
      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map((data, index) => (
            <li key={index}>
              <Link href={`/architecture/${index + 1}`}>
                <h3>{data.title}</h3>
              </Link>
              <p>{data.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No architectures found for this letter.</p>
      )}
    </div>
  );
};

export default ArchitectureAZ;
