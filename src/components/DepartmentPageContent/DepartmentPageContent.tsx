'use client';

import React from "react";
import { Department } from "@/types/departments";
import styles from './DepartmentPageContent.module.css'

type Locale = "uk" | "en";

interface Props {
  departments: Department[];
  locale: Locale;
  heading: string;
}

export default function DepartmentPageContent({ departments, locale, heading }: Props) {
  if (!departments || departments.length === 0) return null;


  const sortedDepartments = departments.slice().sort((a, b) => Number(a.order) - Number(b.order));

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <ul className={styles.list}>
        {sortedDepartments.map((dept) => {
          const d = dept.translates[locale];
          return (
            <li key={dept._id} className={styles.item} style={{ whiteSpace: "pre-line" }}>
              <p className={styles.title}>{d.title ?? "—"}</p>
              <p className={styles.shortTitle}>{d.shortTitle ?? "—"}</p>
              <p className={styles.head}><strong>{d.head ?? "—"}</strong></p>
              <p className={styles.description}>{d.description ?? "—"}</p>
              {d.projects && d.projects.length > 0 && (
                <ul className={styles.projects}>
                  {d.projects.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
