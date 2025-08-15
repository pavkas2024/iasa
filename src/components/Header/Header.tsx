"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { getTranslation } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import Menu from "@/components/Menu/Menu";
import styles from "./Header.module.css";

type Locale = "uk" | "en";

type HeaderProps = {
  locale: Locale;
};

export default function Header({ locale }: HeaderProps) {
  const t = getTranslation(locale);
  const pathname = usePathname();

  // Визначаємо активний шлях без локалі, напр. /uk/institute => institute
  const currentPath = pathname.split("/")[2] || "home";

  // Створюємо масив меню з шляхами і лейблами з перекладу
  const menuItems = [
    { path: "home", label: t.menu.home },
    { path: "institute", label: t.menu.institute },
    { path: "research", label: t.menu.research },
    { path: "intactivity", label: t.menu.intActivity },
    { path: "contacts", label: t.menu.contacts },
  ];

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.menuContainer}>
            <Menu locale={locale} menuItems={menuItems} currentPath={currentPath} />
        </div>   
        <LanguageSwitcher currentLocale={locale} />
      </nav>
    </header>
  );
}
