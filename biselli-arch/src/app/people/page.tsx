import Image from "next/image";
import { Person } from "../types/Person";
import styles from "./page.module.css";

const people: Person[] = [
  {
    id: 1,
    name: "Pipo Lampiao",
    image: "/people/felipe.png",
    role: "Principal Architect",
  },
  {
    id: 2,
    name: "Pipo Lampiao",
    image: "/people/felipe.png",
    role: "Principal Architect",
  },
  {
    id: 3,
    name: "Pipo Lampiao",
    image: "/people/felipe.png",
    role: "Principal Architect",
  },
  {
    id: 4,
    name: "Pipo Lampiao",
    image: "/people/felipe.png",
    role: "Principal Architect",
  },
  {
    id: 5,
    name: "Pipo Lampiao",
    image: "/people/felipe.png",
    role: "Principal Architect",
  },
  {
    id: 6,
    name: "Pipo Lampiao",
    image: "/people/felipe.png",
    role: "Principal Architect",
  },
  {
    id: 7,
    name: "Pipo Lampiao",
    image: "/people/felipe.png",
    role: "Principal Architect",
  },
  {
    id: 8,
    name: "Pipo Lampiao",
    image: "/people/felipe.png",
    role: "Principal Architect",
  },
  {
    id: 9,
    name: "Pipo Lampiao",
    image: "/people/felipe.png",
    role: "Principal Architect",
  },
  // Add more people to fill out the table
];

export default function People() {
  // Calculate how many rows we need based on the number of people
  const rows = Math.ceil(people.length / 7);

  // Create a 2D array to represent the table
  const tableData = Array(rows)
    .fill(null)
    .map((_, rowIndex) => {
      return people.slice(rowIndex * 7, (rowIndex + 1) * 7);
    });

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.row}>
              {row.map((person, colIndex) => (
                <td key={person?.id || colIndex} className={styles.cell}>
                  {person && (
                    <div className={styles.personCard}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={person.image}
                          alt={person.name}
                          width={200}
                          height={200}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <p className={styles.name}>{person.name}</p>
                    </div>
                  )}
                </td>
              ))}
              {/* Fill empty cells if row is not complete */}
              {Array(7 - row.length)
                .fill(null)
                .map((_, index) => (
                  <td key={`empty-${index}`} className={styles.cell}></td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
