import { getInstituteData } from "@/lib/api";
import InstitutePage from "@/components/pages/InstitutePage";
import type { InstituteData } from "@/types/api";

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function Institute({ params }: PageProps) {
    const awaitedParams = await params;  // Чекаємо, поки параметри будуть доступні
  const { locale } = awaitedParams;
  const data: InstituteData = await getInstituteData();

  return <InstitutePage locale={locale} data={data} />;
}