import React from "react";
import { Procurement } from "@/types/procurements";
import styles from './ProcurementModalContent.module.css';

type Props = {
  procurements: Procurement[];
  locale: "uk" | "en";
};

const ProcurementsModalContent: React.FC<Props> = ({ procurements, locale }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Закупівлі</h2>
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
