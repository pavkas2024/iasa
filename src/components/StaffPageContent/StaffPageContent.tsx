'use client';

import React from "react";
import { Staff } from "@/types/staffs";
import StaffCard from "../StaffCard/StaffCard";
import styles from "./StaffPageContent.module.css";

type Locale = "uk" | "en";

interface Props {
  staffs: Staff[];
  locale: Locale;
  advisor: string;
  director: string;
  dep: string;
  secr: string;
  scientific: string;
  fin: string;
}

export default function StaffPageContent({
  staffs,
  locale,
  advisor,
  director,
  dep,
  secr,
  scientific,
  fin,
}: Props) {
  if (!staffs || staffs.length === 0) return null;

  const getByRole = (role: string) => staffs.filter((s) => s.role === role);

  const directorStaff = getByRole("director")[0];
  const advisorStaff = getByRole("advisor")[0];
  const deputies = getByRole("dep");
  const secrStaff = getByRole("secr");
  const scientificStaff = getByRole("scientific");
  const finStaff = getByRole("fin");

  return (
    <section className={styles.section}>

{advisorStaff && (
        <>
          <h2 className={styles.heading}>{advisor}</h2>
          <ul className={styles.specialRoleList}>
            <li className={styles.specialItem}>
              <StaffCard staff={advisorStaff} locale={locale} />
            </li>
          </ul>
        </>
      )}
      
      {directorStaff && (
        <>
          <h2 className={styles.heading}>{director}</h2>
          <ul className={styles.specialRoleList}>
            <li className={styles.specialItem}>
              <StaffCard staff={directorStaff} locale={locale} />
            </li>
          </ul>
        </>
      )}

     

{deputies.length > 0 && (
  <>
    <h2 className={styles.heading}>{dep}</h2>
    <ul className={styles.list}>
      {deputies.map((s) => (
        <li key={s._id} className={styles.item}>
          <StaffCard staff={s} locale={locale} />
        </li>
      ))}
    </ul>
  </>
)}

      {secrStaff.length > 0 && (
        <>
          <h2 className={styles.heading}>{secr}</h2>
          <ul className={styles.specialRoleList}>
            {secrStaff.map((s) => (
              <li key={s._id} className={styles.specialItem}>
                <StaffCard staff={s} locale={locale} />
              </li>
            ))}
          </ul>
        </>
      )}

      {scientificStaff.length > 0 && (
        <>
          <h2 className={styles.heading}>{scientific}</h2>
          <ul className={styles.list}>
            {scientificStaff.map((s) => (
              <li key={s._id} className={styles.item}>
                <StaffCard staff={s} locale={locale} />
              </li>
            ))}
          </ul>
        </>
      )}

      {finStaff.length > 0 && (
        <>
          <h2 className={styles.heading}>{fin}</h2>
          <ul className={styles.list}>
            {finStaff.map((s) => (
              <li key={s._id} className={styles.item}>
                <StaffCard staff={s} locale={locale} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
