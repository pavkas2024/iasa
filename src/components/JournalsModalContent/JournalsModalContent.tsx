import React from "react";
import { Journal } from "@/types/journals";

import styles from './JournalsModalContent.module.css';

type Props = {
  journal: Journal;
  locale: "uk" | "en";
};

const JournalsModalContent: React.FC<Props> = ({ journal, locale }) => {
  if (!journal) return null;

  const title = journal.translates[locale]?.title ?? "—";
  const description = journal.translates[locale]?.description ?? "";

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{title}</h2>

      {journal.photo && (
        <img
          src={journal.photo}
          alt={title}
          className={styles.image}
        />
      )}

      {journal.link && (
        <p className={styles.link}>
          <a href={journal.link} target="_blank" rel="noopener noreferrer">
          {journal.link}
          </a>
        </p>
      )}

      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default JournalsModalContent;
