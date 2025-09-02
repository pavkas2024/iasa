
import { getResearchData } from "@/lib/api";
import { ResearchData } from "@/types/api";
import  IntProjectsPageContent from "@/components/IntProjectsPageContent/IntProjectsPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export const metadata = {
  title: "Міжнародні проєкти ІПСА | International Projects of the IASA",
  description: "Інформація про міжнародні проєкти Інституту прикладного системного аналізу. Information about international projects of the Institute of Applied System Analysis.",
};

export default async function IntProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const data: ResearchData = await getResearchData();
  const t = locale === 'uk' ? uk : en;

  return (
    <IntProjectsPageContent
    locale={locale}
    intprojects={data.intprojects}
    heading={t.submenu.intProjects}
  />
  );
}
