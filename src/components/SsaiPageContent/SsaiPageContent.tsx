
"use client";

import React, { useState } from "react";
import {
  SsaiInfo,
  SsaiPerson,
  SsaiSession,
  SsaiLocale,
} from "@/types/ssai";

import Pagination from "../Pagination/Paginatiom";
import Modal from "../Modal/Modal";

import styles from "./SsaiPageContent.module.css";

interface Props {
  locale: SsaiLocale;
  info: SsaiInfo | null;
  upcoming: SsaiSession[];
  completed: SsaiSession[];
}

export default function SsaiPageContent({
  locale,
  info,
  upcoming,
  completed,
}: Props) {
  const [archivePage, setArchivePage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const itemsPerPage = 5;

  const labels =
    locale === "uk"
      ? {
          chair: "Керівник семінару",
          sections: "Наукові секції",
          sectionHead: "Керівник секції",
          upcoming: "Заплановані засідання",
          archive: "Архів проведених засідань",
          speakers: "Доповідачі",
          materials: "Матеріали засідання",
          noUpcoming: "Наразі запланованих засідань немає.",
          noArchive: "Проведених засідань поки немає.",
          datePending: "Дата уточнюється",
        }
      : {
          chair: "Seminar Chair",
          sections: "Scientific Sections",
          sectionHead: "Section Head",
          upcoming: "Upcoming Sessions",
          archive: "Past Sessions",
          speakers: "Speakers",
          materials: "Session Materials",
          noUpcoming: "No upcoming sessions are currently scheduled.",
          noArchive: "No past sessions yet.",
          datePending: "Date to be confirmed",
        };

  // Форматування дати українською або англійською мовою
  const formatDate = (date: string, time?: string) => {
    const parts = date.split("-");

    if (parts.length < 2) return labels.datePending;

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = parts[2] ? Number(parts[2]) : undefined;

    if (
      !Number.isInteger(year) ||
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12 ||
      (day !== undefined && (day < 1 || day > 31))
    ) {
      return labels.datePending;
    }

    const formatted = new Intl.DateTimeFormat(
      locale === "uk" ? "uk-UA" : "en-GB",
      day
        ? { day: "numeric", month: "long", year: "numeric" }
        : { month: "long", year: "numeric" }
    ).format(new Date(year, month - 1, day ?? 1));

    // Однакові пробіли на сервері та в браузері
    const normalizedDate = formatted.replace(/\u00A0|\u202F/g, " ");

    return time ? `${normalizedDate}, ${time}` : normalizedDate;
  };

  // Інформація про керівника або керівника секції
  const renderPerson = (person: SsaiPerson) => (
    <div className={styles.person}>
      <p className={styles.personName}>{person.name}</p>

      {person.academyStatus && (
        <p className={styles.personDetails}>{person.academyStatus}</p>
      )}

      {(person.degree || person.academicTitle) && (
        <p className={styles.personDetails}>
          {[person.degree, person.academicTitle]
            .filter(Boolean)
            .join(", ")}
        </p>
      )}
    </div>
  );

  // Картка одного засідання
  const renderSession = (session: SsaiSession) => {
    const translation = session.translates[locale];

    return (
      <li key={session._id} className={styles.sessionCard}>
        <p className={styles.sessionDate}>
          {formatDate(session.date, session.time)}
        </p>

        <h3 className={styles.sessionTitle}>{translation.title}</h3>

        <p className={styles.fieldLabel}>{labels.speakers}</p>

        <ul className={styles.speakers}>
          {translation.speakers.map((speaker, index) => (
            <li key={index}>{speaker}</li>
          ))}
        </ul>

        {translation.summary && (
          <p className={styles.summary}>{translation.summary}</p>
        )}

        {session.link && (
          <a
            href={session.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sessionLink}
          >
            {labels.materials}
          </a>
        )}

        {session.photos && session.photos.length > 0 && (
          <div className={styles.photos}>
            {session.photos.map((photo, index) => (
              <button
                key={index}
                type="button"
                className={styles.photoButton}
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo}
                  alt={`${translation.title} — ${index + 1}`}
                />
              </button>
            ))}
          </div>
        )}
      </li>
    );
  };

  // Заплановані засідання: від найближчих до найпізніших
  const sortedUpcoming = [...upcoming].sort(
    (a, b) =>
      a.date.localeCompare(b.date) ||
      a.orderInMonth - b.orderInMonth
  );

  // Проведені засідання: від найновіших до найстаріших
  const sortedCompleted = [...completed].sort(
    (a, b) =>
      b.date.localeCompare(a.date) ||
      b.orderInMonth - a.orderInMonth
  );

  const archivePages = Math.ceil(
    sortedCompleted.length / itemsPerPage
  );

  const visibleArchive = sortedCompleted.slice(
    (archivePage - 1) * itemsPerPage,
    archivePage * itemsPerPage
  );

  const seminar = info?.translates[locale];

  return (
    <section className={styles.section}>
      {/* ЧАСТИНА 1. ЗАГАЛЬНА ІНФОРМАЦІЯ */}
      <div className={styles.aboutBlock}>
        {seminar && (
          <>
            <p className={styles.eyebrow}>
              {locale === "uk"
                ? "МІЖНАРОДНИЙ НАУКОВО-ТЕХНІЧНИЙ СЕМІНАР"
                : "INTERNATIONAL SCIENTIFIC AND TECHNICAL SEMINAR"}
            </p>

            <h1 className={styles.heading}>{seminar.title}</h1>

            <p className={styles.description}>
              {seminar.description}
            </p>

            {/* Керівник семінару */}
            <div className={styles.leadership}>
              <h2 className={styles.subheading}>
                {labels.chair}
              </h2>

              {renderPerson(seminar.chair)}
            </div>

            {/* Наукові секції */}
            <h2 className={styles.subheading}>
              {labels.sections}
            </h2>

            <div className={styles.sections}>
              <div className={styles.sectionCard}>
                <h3>{seminar.section1}</h3>

                <p className={styles.fieldLabel}>
                  {labels.sectionHead}
                </p>

                {renderPerson(seminar.deputy1)}
              </div>

              <div className={styles.sectionCard}>
                <h3>{seminar.section2}</h3>

                <p className={styles.fieldLabel}>
                  {labels.sectionHead}
                </p>

                {renderPerson(seminar.deputy2)}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ЧАСТИНА 2. ПРОГРАМА СЕМІНАРУ */}
      <div className={styles.programBlock}>
        <p className={styles.eyebrow}>
          {locale === "uk"
            ? "ПРОГРАМА СЕМІНАРУ"
            : "SEMINAR PROGRAMME"}
        </p>

        {/* Заплановані засідання */}
        <h2 className={styles.subheading}>
          {labels.upcoming}
        </h2>

        {sortedUpcoming.length > 0 ? (
          <ul className={styles.sessionList}>
            {sortedUpcoming.map(renderSession)}
          </ul>
        ) : (
          <p>{labels.noUpcoming}</p>
        )}

        {/* Архів проведених засідань */}
        <h2 className={styles.subheading}>
          {labels.archive}
        </h2>

        {visibleArchive.length > 0 ? (
          <>
            <ul className={styles.sessionList}>
              {visibleArchive.map(renderSession)}
            </ul>

            <Pagination
              currentPage={archivePage}
              totalPages={archivePages}
              onPageChange={setArchivePage}
            />
          </>
        ) : (
          <p>{labels.noArchive}</p>
        )}
      </div>

      {/* Перегляд фотографій */}
      <Modal
        isOpen={selectedPhoto !== null}
        onClose={() => setSelectedPhoto(null)}
      >
        {selectedPhoto && (
          <img
            src={selectedPhoto}
            alt={
              locale === "uk"
                ? "Фото засідання"
                : "Session photo"
            }
            className={styles.modalPhoto}
          />
        )}
      </Modal>
    </section>
  );
}
