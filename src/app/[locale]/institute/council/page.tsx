import { getInstituteData } from "@/lib/api";
import { InstituteData } from "@/types/api";

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function CouncilPage({ params }: PageProps) {
  const { locale } = await params;
  const data: InstituteData = await getInstituteData();

  return (
    <section>
      <h2>Вчена рада</h2>
      <ul>
        {data.decisions.map(d => (
          <li key={d._id}>{d.translates[locale]?.title ?? "—"}</li>
        ))}
      </ul>
    </section>
  );
}
