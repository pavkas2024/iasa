'use client';

import React, { useState } from "react";
import { Natproject } from "@/types/natprojects";
import Pagination from "../Pagination/Paginatiom";
import styles from './NatProjectsPageContent.module.css';

type Locale = "uk" | "en";

interface Props {
  natprojects: Natproject[];
  locale: Locale;
  heading: string;
}

export default function NatProjectsPageContent({ natprojects, locale, heading }: Props) {
  if (!natprojects || natprojects.length === 0) return null;

  const sortedNatProjects = natprojects
    .slice()
    .sort((a, b) => Number(b.yearStart) - Number(a.yearStart));

  // ---- пагінація ----
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedNatProjects.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = sortedNatProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  // -------------------

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <ul className={styles.list}>
        {currentProjects.map((dept) => {
          const t = dept.translates[locale];
          return (
            <li key={dept._id} className={styles.item} style={{ whiteSpace: "pre-line" }}>
              <p className={styles.title}>{t.title}</p>
              {t.context && <div className={styles.context}>{t.context}</div>}
              {t.head && <div className={styles.head}>{t.head}</div>}
              {t.results && <div className={styles.results}>{t.results}</div>}
              {(dept.yearStart || dept.yearFinish) && (
                    <div className={styles.year}>
                        {dept.yearStart}
                        {dept.yearStart && dept.yearFinish ? "–" : ""}
                        {dept.yearFinish}
                    </div>
                    )}

              {dept.rk && <div className={styles.rk}>{dept.rk}</div>}
              {dept.funding && <div className={styles.funding}>{dept.funding}</div>}
              {dept.link && (
                <div className={styles.doi}>
                  <a href={dept.link} target="_blank" rel="noopener noreferrer">
                    {dept.link}
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