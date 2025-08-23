// app/[locale]/institute/about/page.tsx
import { getInstituteData } from "@/lib/api";
import { InstituteData } from "@/types/api";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';
import AboutPageContent from "@/components/AboutPage/AboutPageContent";

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function AboutPage({ params }: PageProps) {
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
