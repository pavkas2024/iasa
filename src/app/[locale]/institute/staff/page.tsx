import { getInstituteData } from "@/lib/api";
import { InstituteData } from "@/types/api";

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function StaffPage({ params }: PageProps) {
  const { locale } = await params;
  const data: InstituteData = await getInstituteData();

  return (
    <section>
      <h2>Працівники</h2>
      <ul>
        {data.staffs.map(s => (
          <li key={s._id}>
            {`${s.translates[locale]?.surname ?? '—'} ${s.translates[locale]?.name ?? ''}`.trim()}
          </li>
        ))}
      </ul>
    </section>
  );
}
