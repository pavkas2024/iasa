"use client";

import { useRouter, usePathname } from "next/navigation";
import styles from "./LanguageSwitcher.module.css";

const supportedLocales = [
  { code: "uk", label: "Uk" },
  { code: "en", label: "En" },
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (locale: string) => {
    if (locale === currentLocale) return;

    if (typeof document !== "undefined") {
      document.cookie = `preferredLocale=${locale}; path=/; max-age=31536000`; // 1 рік
    }


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
          aria-current={code === currentLocale ? "true" : undefined}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
