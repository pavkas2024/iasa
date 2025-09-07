// app/[locale]/institute/about/page.tsx
import { getInstituteData } from "@/lib/api";
import { InstituteData } from "@/types/api";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';
import AboutPageContent from "@/components/AboutPage/AboutPageContent";

type Locale = "uk" | "en";

export const metadata = {
  title: "Про Інститут ІПСА | About the IASA",
  description: "Інформація про історію та діяльність Інституту прикладного системного аналізу. Information about the history and activities of the Institute of Applied System Analysis.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const data: InstituteData = await getInstituteData();
  const t = locale === 'uk' ? uk : en;

  return (
    <AboutPageContent
      locale={locale}
      instituts={data.instituts}
      heading={t.submenu.history}
    />
  );
}
