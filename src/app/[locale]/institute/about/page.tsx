// app/[locale]/institute/about/page.tsx
import { getInstituteData } from "@/lib/api";
import { InstituteData } from "@/types/api";
import en from '../../../../../public/locales/en/common.json';
import uk from '../../../../../public/locales/uk/common.json';

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const data: InstituteData = await getInstituteData();
  const t = locale === 'uk' ? uk : en;

  return (
    <section>
      <h2>{t.submenu.history}</h2>
      <ul>
        {data.instituts.map(i => (
          <li key={i._id}>
            <p>{i.translates[locale]?.title ?? "—"}</p>
            <p>{i.translates[locale]?.shortTitle ?? "—"}</p>
            <p style={{ whiteSpace: 'pre-line' }}>{i.translates[locale]?.description ?? "—"}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
