"use client";

import { useRouter, usePathname } from "next/navigation";
import styles from "./LanguageSwitcher.module.css";

const supportedLocales = [
  { code: "uk", label: "Українська" },
  { code: "en", label: "English" },
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (locale: string) => {
    if (locale === currentLocale) return;
    const pathWithoutLocale = pathname.replace(/^\/(uk|en)/, "");
    router.push(`/${locale}${pathWithoutLocale}`);
  };

  return (
    <div className={styles.container}>
      {supportedLocales.map(({ code, label }) => (
        <button
          key={code}
          className={`${styles.button} ${code === currentLocale ? styles.active : ""}`}
          onClick={() => switchLocale(code)}
          aria-pressed={code === currentLocale}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
