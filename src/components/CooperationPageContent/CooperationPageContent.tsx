'use client';

import React, { useState } from "react";
import { Collaboration } from "@/types/collaborations";
import Pagination from "../Pagination/Paginatiom";
import styles from './CooperationPageContent.module.css';

type Locale = "uk" | "en";

interface Props {
  collaborations: Collaboration[];
  locale: Locale;
  heading: string;
}

export default function CooperationPageContent({ collaborations, locale, heading }: Props) {

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  if (!collaborations || collaborations.length === 0) return null;

  const totalPages = Math.ceil(collaborations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCollaboration = collaborations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <ul className={styles.list}>
        {currentCollaboration.map((dept) => {
          const t = dept.translates[locale];
          return (
            <li key={dept._id} className={styles.item} style={{ whiteSpace: "pre-line" }}>
              <p className={styles.org}>{t.org}</p>
              {t.description && <p className={styles.description}>{t.description}</p>}
              {dept.photo && dept.photo.length > 0 && (
                <div className={styles.photo}>
                  <img src={dept.photo} alt={t.org} className={styles.photo} />
                </div>
              )}
              {dept.link && (
                <div className={styles.doi}>
                  <a href={dept.link} target="_blank" rel="noopener noreferrer">
                    {dept.link}
                  </a>
                </div>
              )}
              {dept.publications && dept.publications.length > 0 && (
                <ul className={styles.publicationsList}>
                  {dept.publications.map((p, index) => (
                    <li key={index}>
                      <p>{p}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}