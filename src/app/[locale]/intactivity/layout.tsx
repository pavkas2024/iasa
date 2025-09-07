import React, { ReactNode } from "react";
import TwoColumnLayout from "@/components/TwoColumnLayout/TwoColumnLayout";
import en from '../../../../public/locales/en/common.json';
import uk from '../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function IntactivityLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const t = locale === "uk" ? uk : en;

  const menuItems = [
    { key: "intprojects", label: t.submenu.intProjects, href: `/${locale}/intactivity/intprojects` },
    { key: "cooperation", label: t.submenu.intCooperation, href: `/${locale}/intactivity/cooperation` },
  ];

  return <TwoColumnLayout menuItems={menuItems}>{children}</TwoColumnLayout>;
}
