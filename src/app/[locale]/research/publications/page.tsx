
import { getResearchData } from "@/lib/api";
import { ResearchData } from "@/types/api";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function PublicationsPage({ params }: PageProps) {
  const { locale } = await params;
  const data: ResearchData = await getResearchData();
  const t = locale === 'uk' ? uk : en;

  return (
    <section>
      <h2>{t.submenu.publications}</h2>
      <ul>
        {data.publications.map(i => (
          <li key={i._id}>{i.translates[locale]?.title ?? "—"}</li>
        ))}
      </ul>
    </section>
  );
}
