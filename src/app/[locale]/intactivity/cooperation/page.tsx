
import { getIntActivityData } from "@/lib/api";
import { IntActivityData } from "@/types/api";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function CooperationPage({ params }: PageProps) {
  const { locale } = await params;
  const data: IntActivityData = await getIntActivityData();
  const t = locale === 'uk' ? uk : en;

  return (
    <section>
      <h2>{t.submenu.intCooperation}</h2>
      <ul>
        {data.collaborations.map(i => (
          <li key={i._id}>{i.translates[locale]?.org ?? "—"}</li>
        ))}
      </ul>
    </section>
  );
}
