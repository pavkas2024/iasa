import React from "react";
import { Procurement } from "@/types/procurements";

type Props = {
  procurements: Procurement[];
  locale: "uk" | "en";
};

const ProcurementsModalContent: React.FC<Props> = ({ procurements, locale }) => {
  return (
    <div>
      <h2>Закупівлі</h2>
      <ul>
        {procurements.map((procurement) => (
          <li key={procurement._id}>
            <a href={procurement.file} target="_blank" rel="noopener noreferrer">
              {procurement.translates[locale]?.title ?? "—"}
            </a>
            <p>{procurement.year} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcurementsModalContent;
