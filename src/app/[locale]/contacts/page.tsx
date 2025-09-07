import React from "react";
import { getContactsData } from "@/lib/api";
import ContactsPage from "@/components/pages/ContactsPage";
import type { Contact } from "@/types/contacts";

type Locale = "uk" | "en";

export const metadata = {
  title: "Контакти ІПСА | Contacts of the IASA",
  description:
    "Контактна інформація Інституту прикладного системного аналізу. Contact information of the Institute of Applied System Analysis.",
};

// Для App Router у Next.js 15+ params треба await
export default async function Contacts({
  params,
}: {
  params: Promise<{ locale: Locale }>; 
}) {
  const awaitedParams = await params;
  const { locale } = awaitedParams;

  const data = await getContactsData();
  const contacts: Contact[] = data.contacts;

  return <ContactsPage locale={locale} contacts={contacts} />;
}