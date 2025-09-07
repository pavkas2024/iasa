import { getResearchData } from "@/lib/api";
import { ResearchData } from "@/types/api";
import SeminarsPageContent from "@/components/SeminarsPageContent/SeminarsPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

export const metadata = {
  title: "Семінари працівників ІПСА | Staff's Seminars of the IASA",
  description: "Інформація про наукові семінари та конференції працівників Інституту прикладного системного аналізу. Information about scientific seminars and conferences of the staff of the Institute of Applied System Analysis.",
};

export default async function SeminarsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
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
