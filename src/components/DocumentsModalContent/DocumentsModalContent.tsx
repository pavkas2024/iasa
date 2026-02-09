import React from "react";
import { InstituteDocument } from "@/types/documents";
import styles from './DocumentsModalContent.module.css';
import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Props = {
  docs: InstituteDocument[];
  locale: "uk" | "en";
};

const translations = { en, uk };

const DocumentsModalContent: React.FC<Props> = ({ docs, locale }) => {
  const t = translations[locale];
  
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{t.submenu.docs}</h2>
      <ul className={styles.list}>
        {docs.map((doc) => (
          <li key={doc._id} className={styles.item}>
            <a 
              href={doc.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
              >
                 {doc.translates[locale]?.title ?? "—"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsModalContent;
