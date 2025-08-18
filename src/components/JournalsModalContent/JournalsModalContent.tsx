import React from "react";
import { Journal } from "@/types/journals";

import styles from './JournalsModalContent.module.css';

type Props = {
  journals: Journal[];
  locale: "uk" | "en";
};

const JournalsModalContent: React.FC<Props> = ({ journals, locale }) => {
  return (
    <div>
      <h2>Журнал</h2>
    
      <ul>
        {journals.map((journal) => (
          <li key={journal._id}>
              <img src={journal.photo} alt={journal.translates[locale]?.title}    className={styles.image} />
            <a href={journal.link} target="_blank" rel="noopener noreferrer">
              {journal.translates[locale]?.title ?? "—"}
            </a>
            <p>{journal.translates[locale]?.description} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalsModalContent;
