import React from "react";
import { InstituteDocument } from "@/types/documents";

type Props = {
  docs: InstituteDocument[];
  locale: "uk" | "en";
};

const DocumentsModalContent: React.FC<Props> = ({ docs, locale }) => {
  return (
    <div>
      <h2>Документи</h2>
      <ul>
        {docs.map((doc) => (
          <li key={doc._id}>
            <a href={doc.link} target="_blank" rel="noopener noreferrer">
              {doc.translates[locale]?.title ?? "—"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsModalContent;
