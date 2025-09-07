'use client';

import React from "react";
import { Department } from "@/types/departments";
import styles from './DepartmentPageContent.module.css';
import en from '../../../public/locales/en/common.json';
import uk from '../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface Props {
  departments: Department[];
  locale: Locale;
  heading: string;
}

type RoleKey = 'sci' | 'edu' | 'org' | 'fin' | 'pub';

export default function DepartmentPageContent({ departments, locale, heading }: Props) {
  if (!departments || departments.length === 0) return null;


  const t = locale === 'uk' ? uk : en;
  const roleTitles: Record<RoleKey, string> = t.department;


  const sortedDepartments = departments.slice().sort((a, b) => Number(a.order) - Number(b.order));

  
  const roleOrder: RoleKey[] = ['sci', 'edu', 'pub', 'org', 'fin'];


  const grouped: Record<RoleKey, Department[]> = {} as Record<RoleKey, Department[]>;
  sortedDepartments.forEach(dept => {
    const roleKey = dept.role as RoleKey;
    if (!grouped[roleKey]) grouped[roleKey] = [];
    grouped[roleKey].push(dept);
  });

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>

      {roleOrder.map(roleKey => {
        const depts = grouped[roleKey];
        if (!depts || depts.length === 0) return null;

        return (
          <div key={roleKey}>
           <h3 className={styles.roleHeading}>{roleTitles[roleKey]}</h3>
            <ul className={styles.list}>
              {depts.map(dept => {
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
          </div>
        );
      })}
    </section>
  );
}
