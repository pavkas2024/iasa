import React from "react";
import { getTranslation } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale }: { locale: string }) {
    const t = getTranslation(locale);

  return (
  <header>
    <nav>
        <ul>
          <li>{t.menu.home}</li>
          <li>{t.menu.institute}</li>
          <li>{t.menu.research}</li>
          <li>{t.menu.contacts}</li>
        </ul>
        <LanguageSwitcher currentLocale={locale} />
      </nav>
  </header>
  );
}