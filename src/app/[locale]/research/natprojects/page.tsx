
import { getResearchData } from "@/lib/api";
import { ResearchData } from "@/types/api";
import  NatProjectsPageContent from "@/components/NatProjectsPageContent/NatProjectsPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function NatProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const data: ResearchData = await getResearchData();
  const t = locale === 'uk' ? uk : en;

  return (
    <NatProjectsPageContent
    locale={locale}
    natprojects={data.natprojects}
    heading={t.submenu.natProjects}
  />
  );
}
