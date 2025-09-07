'use client';

import React from "react";
import { Decision } from "@/types/decisions";
import styles from './CouncilDecisions.module.css';

type Locale = "uk" | "en";

interface Props {
  decisions: Decision[];
  locale: Locale;
  title: string;
}

export default function CouncilDecisions({ decisions, locale, title }: Props) {
  if (!decisions || decisions.length === 0) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={styles.list}>
        {decisions.map((d) => (
          <li key={d._id} className={styles.item}>
            <a
              href={d.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {d.translates[locale]?.title ?? "—"}
            </a>
            {d.year && <p className={styles.year}>{d.year}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
