"use client";

import React from "react";
import styles from "./Menu.module.css";

type MenuItem = {
  path: string;
  label: string;
};

type Locale = "uk" | "en";

type Props = {
  locale: Locale;
  menuItems: MenuItem[];
  currentPath: string;
};

export default function Menu({ locale, menuItems, currentPath }: Props) {
  return (
    <nav className={styles.nav}>
      <input type="checkbox" id="menu-toggle" className={styles.menuToggle} />
      <label htmlFor="menu-toggle" className={styles.burger} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <ul className={styles.menuList}>
        {menuItems.map(({ path, label }) => {
          const href = path === "home" ? `/${locale}` : `/${locale}/${path}`;
          const isActive = currentPath === path;

          return (
            <li key={path} className={isActive ? styles.active : undefined}>
              <a href={href}>{label}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
