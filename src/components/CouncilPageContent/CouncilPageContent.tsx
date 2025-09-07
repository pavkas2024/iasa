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

  // Головний
  const headStaff = staffs.find((s) => s.order === "1000");

  // Заступники (1100 та 1110) з сортуванням
  const depStaffs = staffs
    .filter((s) => s.order === "1110" || s.order === "1100")
    .sort((a, b) => Number(b.order) - Number(a.order));

  // Секретар
  const secrStaff = staffs.find((s) => s.order === "1220");

  // Члени ради
  const memberStaffs = staffs
    .filter(
      (s) =>
        s.council === "так" &&
        s.order !== "1000" &&
        s.order !== "1100" &&
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

      {depStaffs.length > 0 && (
        <>
          <h2 className={styles.heading}>{dep}</h2>
          <ul className={styles.specialRoleList}>
            {depStaffs.map((s) => (
              <li key={s._id} className={styles.specialItem}>
                <StaffCard staff={s} locale={locale} />
              </li>
            ))}
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
