import { getContactsData } from "@/lib/api";
import ContactsPage from "@/components/pages/ContactsPage";
import type { Contact } from "@/types/contacts";

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function Contacts({ params }: PageProps) {
    const awaitedParams = await params; 
  const { locale } = awaitedParams;
  const data = await getContactsData();
  const contacts: Contact[] = data.contacts;

  return <ContactsPage locale={locale} contacts={contacts} />;
}