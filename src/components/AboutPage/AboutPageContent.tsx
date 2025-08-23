'use client';

import React from "react";
import styles from './AboutPageContent.module.css';
import { Institut } from "@/types/instituts";

type Locale = "uk" | "en";


interface Props {
  locale: Locale;
  instituts: Institut[];
  heading: string;
}


const AboutPageContent: React.FC<Props> = ({ locale, instituts, heading }) => {
  const institut = instituts[0]; 

  if (!institut) return null;
 
  return (
      <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.item}>
        <p className={styles.title}>
          {institut.translates[locale]?.title ?? "—"}
        </p>
        <p className={styles.shortTitle}>
          {institut.translates[locale]?.shortTitle ?? "—"}
        </p>
        <p className={styles.description}>
          {institut.translates[locale]?.description ?? "—"}
        </p>
      </div>
    </section>
  );
};

export default AboutPageContent;
