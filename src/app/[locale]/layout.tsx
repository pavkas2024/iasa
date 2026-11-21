
import { ReactNode } from "react";
import { notFound } from "next/navigation";

import style from "./Layout.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

type Locale = "uk" | "en";

const supportedLocales: Locale[] = ["uk", "en"];

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;

  return (
    <div className={`${inter.className} ${style.pagecontainer}`}>
      <Header locale={currentLocale} />

      <main className={style.container}>
        {children}
      </main>

      <Footer locale={currentLocale} />
    </div>
  );
}
