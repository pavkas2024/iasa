import { getResearchData } from "@/lib/api";
import { ResearchData } from "@/types/api";
import NatProjectsPageContent from "@/components/NatProjectsPageContent/NatProjectsPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

export const metadata = {
  title: "Національні проєкти ІПСА | National Projects of the IASA",
  description: "Інформація про національні проєкти Інституту прикладного системного аналізу. Information about national projects of the Institute of Applied System Analysis.",
};

export default async function NatProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
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
