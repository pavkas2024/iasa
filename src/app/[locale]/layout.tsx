import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

import "../globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

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
  params: { locale: string };
}

const supportedLocales = ["uk", "en"];

export const metadata: Metadata = {
  title: "IASA",
  description: "Institute site",
};

export function generateStaticParams() {
  return [
    { locale: 'uk' },
    { locale: 'en' },
  ];
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const awaitedParams = await params;  // Чекаємо, поки параметри будуть доступні
  const { locale } = awaitedParams;

  if (!supportedLocales.includes(locale)) {
    notFound(); // повернути 404 у Next.js App Router
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}