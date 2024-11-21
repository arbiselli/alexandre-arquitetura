import Image from "next/image";
import { Person } from "../types/Person";
import FilterTabs from "./components/FilterTabs";
import styles from "./page.module.css";

const people: Person[] = [
  {
    id: 1,
    name: "Brittany Abbott",
    image:
      "https://newmorphassets.s3.amazonaws.com/uploads/6430/BrittanyAbbott_Comp-6_select.jpg",
    role: "Principal Architect",
    type: "partners",
  },
  {
    id: 2,
    name: "Elchin Akperov",
    image:
      "https://newmorphassets.s3.amazonaws.com/uploads/7438/ElchinAkperov-Website-Selected.jpg",
    role: "Principal Architect",
    type: "leadership",
  },
  {
    id: 3,
    name: "Allison Ball",
    image: "https://newmorphassets.s3.amazonaws.com/uploads/4909/Allison-l.jpg",
    role: "Principal Architect",
    type: "partners",
  },
  {
    id: 4,
    name: "Hann-Shiuh Chen",
    image: "/people/felipe.png",
    role: "Principal Architect",
    type: "leadership",
  },
  {
    id: 5,
    name: "Brittany Abbott",
    image:
      "https://newmorphassets.s3.amazonaws.com/uploads/6430/BrittanyAbbott_Comp-6_select.jpg",
    role: "Principal Architect",
    type: "partners",
  },
  {
    id: 6,
    name: "Elchin Akperov",
    image:
      "https://newmorphassets.s3.amazonaws.com/uploads/7438/ElchinAkperov-Website-Selected.jpg",
    role: "Principal Architect",
    type: "leadership",
  },
  {
    id: 7,
    name: "Allison Ball",
    image: "https://newmorphassets.s3.amazonaws.com/uploads/4909/Allison-l.jpg",
    role: "Principal Architect",
    type: "partners",
  },
  {
    id: 8,
    name: "Hann-Shiuh Chen",
    image: "/people/felipe.png",
    role: "Principal Architect",
    type: "leadership",
  },
  {
    id: 9,
    name: "Brittany Abbott",
    image:
      "https://newmorphassets.s3.amazonaws.com/uploads/6430/BrittanyAbbott_Comp-6_select.jpg",
    role: "Principal Architect",
    type: "partners",
  },
  {
    id: 10,
    name: "Elchin Akperov",
    image:
      "https://newmorphassets.s3.amazonaws.com/uploads/7438/ElchinAkperov-Website-Selected.jpg",
    role: "Principal Architect",
    type: "leadership",
  },
  {
    id: 11,
    name: "Allison Ball",
    image: "https://newmorphassets.s3.amazonaws.com/uploads/4909/Allison-l.jpg",
    role: "Principal Architect",
    type: "partners",
  },
  {
    id: 12,
    name: "Hann-Shiuh Chen",
    image: "/people/felipe.png",
    role: "Principal Architect",
    type: "leadership",
  },
  {
    id: 13,
    name: "Brittany Abbott",
    image:
      "https://newmorphassets.s3.amazonaws.com/uploads/6430/BrittanyAbbott_Comp-6_select.jpg",
    role: "Principal Architect",
    type: "partners",
  },
  {
    id: 14,
    name: "Elchin Akperov",
    image:
      "https://newmorphassets.s3.amazonaws.com/uploads/7438/ElchinAkperov-Website-Selected.jpg",
    role: "Principal Architect",
    type: "leadership",
  },
  {
    id: 15,
    name: "Allison Ball",
    image: "https://newmorphassets.s3.amazonaws.com/uploads/4909/Allison-l.jpg",
    role: "Principal Architect",
    type: "partners",
  },
  {
    id: 16,
    name: "Hann-Shiuh Chen",
    image: "/people/felipe.png",
    role: "Principal Architect",
    type: "leadership",
  },
  // Add more people to fill out the table
];

export default async function People({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Use 'q' parameter instead of 'filter'
  const { q } = await import("next/navigation").then(() => searchParams);
  const queryParam = Array.isArray(q) ? q[0] : q ?? "";

  const filteredPeople = queryParam
    ? people.filter((person) => person.type === queryParam)
    : people;

  return (
    <div className={styles.container}>
      <FilterTabs />
      <div className={styles.grid}>
        {filteredPeople.map((person) => (
          <div key={person.id} className={styles.personCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={person.image}
                alt={person.name}
                width={200}
                height={200}
                quality={100}
                priority={person.id <= 4}
                style={{
                  width: "250px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            </div>
            <p className={styles.name}>{person.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
