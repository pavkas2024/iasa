
import { getResearchData } from "@/lib/api";
import { ResearchData } from "@/types/api";
import  SeminarsPageContent from "@/components/SeminarsPageContent/SeminarsPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function SeminarsPage({ params }: PageProps) {
  const { locale } = await params;
  const data: ResearchData = await getResearchData();
  const t = locale === 'uk' ? uk : en;

  return (
    <SeminarsPageContent
    locale={locale}
    seminars={data.seminars}
    heading={t.submenu.conferences}
  />
  );
}
