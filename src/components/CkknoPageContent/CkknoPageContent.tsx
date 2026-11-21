
import React from "react";

import en from "../../../public/locales/en/common.json";
import uk from "../../../public/locales/uk/common.json";

import type { CkknoInfo } from "@/types/ckkno";
import ContactForm from "@/components/ContactForm/ContactForm";

import styles from "./CkknoPageContent.module.css";

type Locale = "uk" | "en";

interface Props {
  locale: Locale;
  info: CkknoInfo | null;
}

export default function CkknoPageContent({ locale, info }: Props) {
  const t = locale === "uk" ? uk.ckkno : en.ckkno;

  // Опис Центру отримуємо з backend.
  const description = info?.translates?.[locale]?.description ?? "";

  // Кожне посилання зберігається в окремому полі backend.
  const documents = [
    {
      key: "order",
      label: t.order,
      url: info?.orderUrl ?? "",
    },
    {
      key: "regulations",
      label: t.regulations,
      url: info?.regulationsUrl ?? "",
    },
    {
      key: "procedure",
      label: t.procedure,
      url: info?.procedureUrl ?? "",
    },
    {
      key: "development",
      label: t.development,
      url: info?.developmentPlanUrl ?? "",
    },
    {
      key: "equipment",
      label: t.equipment,
      url: info?.equipmentUrl ?? "",
    },
  ];

  // Напрями діяльності залишаються на frontend.
  const directions = [
    t.biosystems,
    t.cognitive,
    t.gis,
    t.twins,
  ];

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1 className={styles.heading}>{t.heading}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </div>

      <div className={styles.documentsSection}>
        <h2 className={styles.subheading}>{t.documents}</h2>

        <div className={styles.documentsGrid}>
          {documents.map((document) =>
            document.url ? (
              <a
                key={document.key}
                href={document.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.documentLink}
              >
                <span>{document.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <div
                key={document.key}
                className={`${styles.documentLink} ${styles.disabled}`}
                title={t.comingSoon}
                aria-disabled="true"
              >
                <span>{document.label}</span>
              </div>
            )
          )}
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h2 className={styles.subheading}>{t.about}</h2>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        <h2 className={styles.subheading}>{t.directions}</h2>

        <div className={styles.directionsGrid}>
          {directions.map((direction) => (
            <div key={direction} className={styles.direction}>
              {direction}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.feedbackSection}>
        <h2 className={styles.subheading}>{t.feedback}</h2>
        <p className={styles.description}>
          {t.feedbackDescription}
        </p>

        <ContactForm locale={locale} />
      </div>
    </section>
  );
}
