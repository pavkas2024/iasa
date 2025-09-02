import dynamic from 'next/dynamic';
import { getInstituteData } from "@/lib/api";
import { InstituteData } from "@/types/api";
import CouncilPageContent from "@/components/CouncilPageContent/CouncilPageContent";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';


const CouncilDecisions = dynamic(() => import('@/components/CouncilDecisions/CouncilDecisions'));

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export const metadata = {
  title: "Вчена Рада ІПСА | Council of the IASA",
  description: "Інформація про раду Інституту прикладного системного аналізу, її членів та прийняті рішення. Information about the Institute Council of the IASA, its members, and decisions.",
};

export default async function CouncilPage({ params }: PageProps) {
  const { locale } = await params;
  const data: InstituteData = await getInstituteData();
  const t = locale === 'uk' ? uk : en;

  return (
    <section>
       <CouncilPageContent
      locale={locale}
      staffs={data.staffs}
      head={t.council.head}
      dep={t.council.dep}
      secr={t.council.secr}
      member={t.council.member}
    />
       <CouncilDecisions
        decisions={data.decisions}
        locale={locale}
        title={t.submenu.decisions}
      />
    </section>
  );
}
