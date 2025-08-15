import { getContactsData } from "@/lib/api";
import ContactsPage from "@/components/pages/ContactsPage";
import type { Contact } from "@/types/contacts";

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function Contacts({ params }: PageProps) {
    const awaitedParams = await params;  // Чекаємо, поки параметри будуть доступні
  const { locale } = awaitedParams;
  const contacts: Contact[] = await getContactsData();

  return <ContactsPage locale={locale} contacts={contacts} />;
}