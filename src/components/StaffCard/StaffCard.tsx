import React from "react";
import { Staff } from "@/types/staffs";
import styles from "./Staffcard.module.css";
import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface StaffCardProps {
  staff: Staff;
  locale: Locale;
}

export default function StaffCard({ staff, locale }: StaffCardProps) {
  const d = staff.translates[locale];
  const pr = staff.profiles || {};
  const t = locale === "uk" ? uk : en;

  return (
    <>
      <div className={styles.topBlock}>
        {staff.photo && (
          <img src={staff.photo} alt={d.surname} className={styles.photo} />
        )}
        <div className={styles.mainInfo}>
          <p className={styles.fullName}>
            {[d.name, d.patronymic, d.surname].filter(Boolean).join(" ")}
          </p>

          <div className={styles.degreeBlock}>
            <div className={styles.degreeLine}>
              {d.degree && <span>{d.degree}</span>}
              {d.acadTitle && <span>{d.acadTitle}</span>}
            </div>
            {d.acadTitle2 && (
              <div className={styles.degreeLine}>
                <span>{d.acadTitle2}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bottomBlock}>
        <p className={styles.position}>{d.position}</p>
        <p className={styles.department}>{d.department}</p>
        {d.info && <p className={styles.info}>{d.info}</p>}

        {staff.link && (
          <p className={styles.link}>
            <a href={staff.link} target="_blank" rel="noopener noreferrer">
              {staff.link}
            </a>
          </p>
        )}

        <div className={styles.profilesRow}>
          {staff.cv && (
            <p className={styles.link}>
              <a href={staff.cv} target="_blank" rel="noopener noreferrer">
                {t.staff.cv}
              </a>
            </p>
          )}

          {staff.pub && (
            <p className={styles.link}>
              <a href={staff.pub} target="_blank" rel="noopener noreferrer">
                {t.staff.pub}
              </a>
            </p>
          )}

          {staff.shortPub && (
            <p className={styles.link}>
              <a href={staff.shortPub} target="_blank" rel="noopener noreferrer">
                {t.staff.shortPub}
              </a>
            </p>
          )}
        </div>

        <div className={styles.profilesRow}>
          {pr.orcid && (
            <a href={pr.orcid} target="_blank" rel="noopener noreferrer">
              ORCID
            </a>
          )}
          {pr.linkedIn && (
            <a href={pr.linkedIn} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
          {pr.googleScholar && (
            <a href={pr.googleScholar} target="_blank" rel="noopener noreferrer">
              Google Scholar
            </a>
          )}
          {pr.scopus && (
            <a href={pr.scopus} target="_blank" rel="noopener noreferrer">
              Scopus
            </a>
          )}
          {pr.wos && (
            <a href={pr.wos} target="_blank" rel="noopener noreferrer">
              Web of Science
            </a>
          )}
          {pr.academy && (
            <a href={pr.academy} target="_blank" rel="noopener noreferrer">
              Academia
            </a>
          )}
          {pr.facebook && (
            <a href={pr.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          )}
        </div>
      </div>
    </>
  );
}
