import { getContactsData } from "@/lib/api";
import ContactsPage from "@/components/pages/ContactsPage";

export default async function Contacts({ params }: { params: { locale: string } }) {
  const contacts = await getContactsData(params.locale);
  return <ContactsPage locale={params.locale} contacts={contacts} />;
}