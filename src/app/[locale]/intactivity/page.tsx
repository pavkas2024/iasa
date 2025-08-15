import { getIntActivityData } from "@/lib/api";
import IntActivityPage from "@/components/pages/IntActivityPage";
import type { IntActivityData } from "@/types/api";

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function IntActivity({ params }: PageProps) {
    const awaitedParams = await params;  // Чекаємо, поки параметри будуть доступні
    const { locale } = awaitedParams;
  const data: IntActivityData = await getIntActivityData();

  return <IntActivityPage locale={locale} data={data} />;
}