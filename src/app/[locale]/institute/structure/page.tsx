import { getInstituteData } from "@/lib/api";
import { InstituteData } from "@/types/api";
import DepartmentPageContent from "@/components/DepartmentPageContent/DepartmentPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

export const metadata = {
  title: "Структура Інституту ІПСА | Structure of the IASA",
  description: "Інформація про структурні підрозділи Інституту прикладного системного аналізу. Information about the structural departments of the Institute of Applied System Analysis.",
};

export default async function StructurePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const data: InstituteData = await getInstituteData();
  const t = locale === 'uk' ? uk : en;

  return (
    <DepartmentPageContent
      locale={locale}
      departments={data.departments}
      heading={t.submenu.departments}
    />
  );
}
