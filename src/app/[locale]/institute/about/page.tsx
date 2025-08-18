// app/[locale]/institute/about/page.tsx
import { getInstituteData } from "@/lib/api";
import { InstituteData } from "@/types/api";

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const data: InstituteData = await getInstituteData();

  return (
    <section>
      <h2>Про інститут</h2>
      <ul>
        {data.instituts.map(i => (
          <li key={i._id}>{i.translates[locale]?.title ?? "—"}</li>
        ))}
      </ul>
    </section>
  );
}
