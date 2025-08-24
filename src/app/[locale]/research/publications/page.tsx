
import { getResearchData } from "@/lib/api";
import { ResearchData } from "@/types/api";
import PublicationPageContent from "@/components/PublicationPageContent/PublicationPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function PublicationsPage({ params }: PageProps) {
  const { locale } = await params;
  const data: ResearchData = await getResearchData();
  const t = locale === 'uk' ? uk : en;

  return (
     <PublicationPageContent
     locale={locale}
     publications={data.publications}
     heading={t.submenu.publications}
   />
  );
}
