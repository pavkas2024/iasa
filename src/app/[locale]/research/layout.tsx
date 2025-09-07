import React, { ReactNode } from "react";
import TwoColumnLayout from "@/components/TwoColumnLayout/TwoColumnLayout";
import en from '../../../../public/locales/en/common.json';
import uk from '../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function ResearchLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const t = locale === "uk" ? uk : en;

  const menuItems = [
    { key: "publications", label: t.submenu.publications, href: `/${locale}/research/publications` },
    { key: "natprojects", label: t.submenu.natProjects, href: `/${locale}/research/natprojects` },
    { key: "intprojects", label: t.submenu.intProjects, href: `/${locale}/research/intprojects` },
    { key: "seminars", label: t.submenu.conferences, href: `/${locale}/research/seminars` },
  ];

  return <TwoColumnLayout menuItems={menuItems}>{children}</TwoColumnLayout>;
}
