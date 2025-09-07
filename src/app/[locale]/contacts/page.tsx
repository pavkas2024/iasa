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

export default async function Contacts({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const data = await getContactsData();
  const contacts: Contact[] = data.contacts;

  return <ContactsPage locale={locale} contacts={contacts} />;
}