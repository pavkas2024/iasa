'use client';

import React, { useState } from "react";
import { Publication } from "@/types/publications";
import Pagination from "../Pagination/Paginatiom";
import styles from './PublicationPageContent.module.css'

type Locale = "uk" | "en";

interface Props {
  publications: Publication[];
  locale: Locale;
  heading: string;
}

export default function DepartmentPageContent({ publications, locale, heading }: Props) {
  if (!publications || publications.length === 0) return null;

  const sortedPublications = publications
    .slice()
    .sort((a, b) => Number(b.year) - Number(a.year));

  // ---- пагінація ----
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedPublications.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPublications = sortedPublications.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  // -------------------

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <ul className={styles.list}>
        {currentPublications.map((dept) => {
          const t = dept.translates[locale];
          return (
            <li key={dept._id} className={styles.item} style={{ whiteSpace: "pre-line" }}>
              <p className={styles.title}>{t.title}</p>
              {t.authors && <div className={styles.authors}>{t.authors}</div>}
              {t.journal && <div className={styles.journal}>{t.journal}</div>}
              {t.publisher && <div className={styles.publisher}>{t.publisher}</div>}
              {t.city && <div className={styles.city}>{t.city}</div>}
              {t.pages && <div className={styles.pages}>{t.pages}</div>}
              {t.description && <div className={styles.description}>{t.description}</div>}
              {t.other && <div className={styles.other}>{t.other}</div>}
              {dept.issn && <div className={styles.issn}>ISSN: {dept.issn}</div>}
              {dept.year && <div className={styles.year}>{dept.year}</div>}
              {dept.doi && (
                <div className={styles.doi}>
                  <a href={`https://doi.org/${dept.doi}`} target="_blank" rel="noopener noreferrer">
                    {dept.doi}
                  </a>
                </div>
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
