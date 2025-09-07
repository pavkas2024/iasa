import React from "react";
import { Procurement } from "@/types/procurements";
import styles from './ProcurementModalContent.module.css';
import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Props = {
  procurements: Procurement[];
  locale: "uk" | "en";
};
const translations = { en, uk };

const ProcurementsModalContent: React.FC<Props> = ({ procurements, locale }) => {
  const t = translations[locale];
  
  
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{t.submenu.procurements}</h2>
      <ul className={styles.list}>
        {procurements.map((procurement) => (
          <li key={procurement._id} className={styles.item}>
            <a
              href={procurement.file}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {procurement.translates[locale]?.title ?? "—"}
            </a>
            <p className={styles.year}>{procurement.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcurementsModalContent;
