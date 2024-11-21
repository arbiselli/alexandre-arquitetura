"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArchitectureData } from "../architectureData";

export default function ArchitectureAZ() {
  const [originalData, setOriginalData] = useState<ArchitectureData[]>([]); // Store original data
  const [filteredData, setFilteredData] = useState<ArchitectureData[]>([]); // Store filtered data
  const searchParams = useSearchParams();

  // Fetch data from JSON
  const fetchData = async () => {
    try {
      const response = await fetch("/architectureData.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOriginalData(data); // Set original data
      setFilteredData(data); // Initialize filtered data
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // Handle error (e.g., set an error state)
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData on component mount
  }, []);

  useEffect(() => {
    const letter = searchParams.get("q") as string | null;

    if (letter) {
      const filtered = originalData.filter((item) =>
        item.title.startsWith(letter.toUpperCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(originalData); // Reset to original data if no letter is provided
    }
  }, [searchParams, originalData]); // Depend on originalData

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
}
