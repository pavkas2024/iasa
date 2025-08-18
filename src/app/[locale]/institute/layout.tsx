// app/[locale]/institute/layout.tsx
import React, { ReactNode } from "react";
import TwoColumnLayout from "@/components/TwoColumnLayout/TwoColumnLayout";
import en from '../../../../public/locales/en/common.json';
import uk from '../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface LayoutProps {
  children: ReactNode;
  params: { locale: Locale };
}

export default async function InstituteLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const t = locale === "uk" ? uk : en;

  const menuItems = [
    { key: "about", label: t.submenu.strInstitute, href: `/${locale}/institute/about` },
    { key: "structure", label: t.submenu.departments, href: `/${locale}/institute/structure` },
    { key: "staff", label: t.submenu.staff, href: `/${locale}/institute/staff` },
    { key: "council", label: t.submenu.scientificCouncil, href: `/${locale}/institute/council` },
  ];

  return <TwoColumnLayout menuItems={menuItems}>{children}</TwoColumnLayout>;
}
