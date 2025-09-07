import { ReactNode } from "react"; // додати цей імпорт
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";

import style from "./Layout.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"]
});

type Locale = "uk" | "en";
const supportedLocales: Locale[] = ["uk", "en"];

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  const cookieStore = await cookies();
  const preferredLocale = cookieStore.get("preferredLocale")?.value;

  if (preferredLocale && preferredLocale !== locale && supportedLocales.includes(preferredLocale)) {
    redirect(`/${preferredLocale}`);
  }

  return (
    <div className={`${inter.className} ${style.pagecontainer}`}>
      <Header locale={locale} />
      <main className={style.container}>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
