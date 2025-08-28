import { getInstituteData } from "@/lib/api";
import { InstituteData } from "@/types/api";
import DepartmentPageContent from "@/components/DepartmentPageContent/DepartmentPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function StructurePage({ params }: PageProps) {
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
