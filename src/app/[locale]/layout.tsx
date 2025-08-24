import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";


import "../globals.css";
import style from "./Layout.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

type Locale = "uk" | "en";
const supportedLocales: Locale[] = ["uk", "en"];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LayoutProps {
  children: ReactNode;
  params: { locale: Locale };
}



export const metadata: Metadata = {
  title: "IASA",
  description: "Institute site",
};

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const awaitedParams = await params;  // Чекаємо, поки параметри будуть доступні
  const { locale } = awaitedParams;

  const cookieStore = await cookies();
  const preferredLocale = cookieStore.get("preferredLocale")?.value;

 

  if (!supportedLocales.includes(locale)) {
    notFound(); // повернути 404 у Next.js App Router
  }


  if (preferredLocale && preferredLocale !== locale && supportedLocales.includes(preferredLocale)) {
    // Редирект на правильну мову з cookie
    redirect(`/${preferredLocale}`);
  }

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body className={`${inter.variable}`}>
       <div className={style.pagecontainer}>
       <Header locale={locale} />
        <main className={style.container}>{children}</main>
        <Footer locale={locale}/>
       </div>
      </body>
    </html>
  );
}