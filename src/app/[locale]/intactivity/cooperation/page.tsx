
import { getIntActivityData } from "@/lib/api";
import { IntActivityData } from "@/types/api";
import CooperationPageContent from "@/components/CooperationPageContent/CooperationPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export const metadata = {
  title: "Міжнародна співпраця ІПСА | International Cooperation of the IASA",
  description: "Інформація про міжнародну співпрацю Інституту прикладного системного аналізу. Information about international cooperation of the Institute of Applied System Analysis.",
};

export default async function CooperationPage({ params }: PageProps) {
  const { locale } = await params;
  const data: IntActivityData = await getIntActivityData();
  const t = locale === 'uk' ? uk : en;

  return (
    <CooperationPageContent
    locale={locale}
    collaborations={data.collaborations}
    heading={t.submenu.intCooperation}
  />
  );
}
