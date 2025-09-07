'use client';

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
  const currentPath = pathname.split("/")[2] || "home";

  const menuItems = [
    { path: "home", label: t.menu.home },
    { path: "institute", label: t.menu.institute },
    { path: "research", label: t.menu.research },
    { path: "intactivity", label: t.menu.intActivity },
    { path: "contacts", label: t.menu.contacts },
  ];

  const logoSrc = locale === "uk" ? "/iasaUkr.png" : "/iasaEng.png";

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
        <a href={`/${locale}`} className={styles.logoWrapper} title={locale === "uk" ? "Головна сторінка" : "Home"}>
            <Image
              src={logoSrc}
              alt="Logo"
              width={106} // оригінальна ширина
              height={145} // оригінальна висота
              style={{ height: 'auto', width: 'auto', maxHeight: '76px' }} // обмежує висоту, зберігає пропорції
              priority
            />
          </a>
        </div>

        <div className={styles.menuContainer}>
          <Menu locale={locale} menuItems={menuItems} currentPath={currentPath} />
        </div>

        <LanguageSwitcher currentLocale={locale} />
      </nav>
    </header>
  );
}
