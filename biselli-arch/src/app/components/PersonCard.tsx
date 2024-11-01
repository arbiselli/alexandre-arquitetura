import Image from "next/image";
import { Person } from "../types/Person";
import styles from "./PersonCard.module.css";

interface PersonCardProps {
  person: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={person.image}
          alt={person.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <h3 className={styles.name}>{person.name}</h3>
      {person.role && <p className={styles.role}>{person.role}</p>}
    </div>
  );
};

export default PersonCard;
