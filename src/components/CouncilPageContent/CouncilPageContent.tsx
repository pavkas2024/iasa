import React from "react";
import { Staff } from "@/types/staffs";
import StaffCard from "../StaffCard/StaffCard";
import styles from "./CouncilPageContent.module.css";

type Locale = "uk" | "en";

interface Props {
  staffs: Staff[];
  locale: Locale;
  head: string;
  dep: string;
  secr: string;
  member: string;
}

export default function CouncilPageContent({
  staffs,
  locale,
  head,
  dep,
  secr,
  member,
}: Props) {
  if (!staffs || staffs.length === 0) return null;

  // Вибираємо конкретних людей за order
  const headStaff = staffs.find((s) => s.order === "1000");
  const depStaff = staffs.find((s) => s.order === "1110");
  const secrStaff = staffs.find((s) => s.order === "1220");

  // Формуємо список членів ради
  const memberStaffs = staffs
    .filter(
      (s) =>
        s.council === "так" &&
        s.order !== "1000" &&
        s.order !== "1110" &&
        s.order !== "1220"
    )
    .slice()
    .sort((a, b) => Number(a.order) - Number(b.order));

  return (
    <section className={styles.section}>
      {headStaff && (
        <>
          <h2 className={styles.heading}>{head}</h2>
          <ul className={styles.specialRoleList}>
            <li className={styles.specialItem}>
              <StaffCard staff={headStaff} locale={locale} />
            </li>
          </ul>
        </>
      )}

      {depStaff && (
        <>
          <h2 className={styles.heading}>{dep}</h2>
          <ul className={styles.specialRoleList}>
            <li className={styles.specialItem}>
              <StaffCard staff={depStaff} locale={locale} />
            </li>
          </ul>
        </>
      )}

      {secrStaff && (
        <>
          <h2 className={styles.heading}>{secr}</h2>
          <ul className={styles.specialRoleList}>
            <li className={styles.specialItem}>
              <StaffCard staff={secrStaff} locale={locale} />
            </li>
          </ul>
        </>
      )}

      {memberStaffs.length > 0 && (
        <>
          <h2 className={styles.heading}>{member}</h2>
          <ul className={styles.list}>
            {memberStaffs.map((s) => (
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