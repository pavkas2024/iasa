'use client';

import React, { useState } from "react";
import { Seminar } from "@/types/seminars";
import Pagination from "../Pagination/Paginatiom";
import Modal from "../Modal/Modal";
import parseDate from "@/utils/parseDate";
import styles from './SeminarsPageContent.module.css';

import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface Props {
  seminars: Seminar[];
  locale: Locale;
  heading: string;
}

export default function SeminarsPageContent({ seminars, locale, heading }: Props) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  
  if (!seminars || seminars.length === 0) return null;

  const sortedSeminars = seminars.slice().sort((a, b) => parseDate(b.date) - parseDate(a.date));


  const totalPages = Math.ceil(sortedSeminars.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = sortedSeminars.slice(startIndex, startIndex + itemsPerPage);
  // -------------------

  const [modalPhoto, setModalPhoto] = useState<string | null>(null);
  const isModalOpen = modalPhoto !== null;

  const openModal = (photo: string) => setModalPhoto(photo);
  const closeModal = () => setModalPhoto(null);

  const d = locale === "uk" ? uk : en; 

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <ul className={styles.list}>
        {currentProjects.map((dept) => {
          const t = dept.translates[locale];
          return (
            <li key={dept._id} className={styles.item} style={{ whiteSpace: "pre-line" }}>
              <p className={styles.title}>{t.title}</p>
              {t.place && <p className={styles.place}>{t.place}</p>}
              {t.description && <p className={styles.description}>{t.description}</p>}
              {dept.photos && dept.photos.length > 0 && (
                <div className={styles.photos}>
                  {dept.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={t.title}
                      className={styles.photo}
                      onClick={() => openModal(photo)}
                    />
                  ))}
                </div>
              )}
              {dept.date && <p className={styles.date}>{dept.date}</p>}
              {dept.link && (
                <div className={styles.doi}>
                  <a href={dept.link} target="_blank" rel="noopener noreferrer">
                    {d.buttons.open}
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalPhoto && (
          <img
            src={modalPhoto}
            alt="Велике фото"
            style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
          />
        )}
      </Modal>
    </section>
  );
}
