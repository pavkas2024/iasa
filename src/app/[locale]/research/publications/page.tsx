import { getResearchData } from "@/lib/api";
import { ResearchData } from "@/types/api";
import PublicationPageContent from "@/components/PublicationPageContent/PublicationPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

export const metadata = {
  title: "Публікації ІПСА | Publications of the IASA",
  description: "Інформація про наукові публікації Інституту прикладного системного аналізу. Information about scientific publications of the Institute of Applied System Analysis.",
};

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
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
