import { getInstituteData } from "@/lib/api";
import { InstituteData } from "@/types/api";
import StaffPageContent from "@/components/StaffPageContent/StaffPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';


type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function StaffPage({ params }: PageProps) {
  const { locale } = await params;
  const data: InstituteData = await getInstituteData();
  const t = locale === 'uk' ? uk : en;

  return (
    <StaffPageContent
      locale={locale}
      staffs={data.staffs}
      advisor={t.staff.advisor}
      director={t.staff.director}
      dep={t.staff.dep}
      secr={t.staff.secr}
      scientific={t.staff.scientific}
      fin={t.staff.fin}
    />
  );
}
