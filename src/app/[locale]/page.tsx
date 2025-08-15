import { getHomeData } from "@/lib/api";
import HomePage from "@/components/pages/HomePage";
import type { HomeData } from "@/types/api";

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export function generateStaticParams() {
  return [
    { locale: "uk" },
    { locale: "en" },
  ];
}

export default async function Home({ params }: PageProps) {
  const awaitedParams = await params;  // Чекаємо, поки параметри будуть доступні
  const { locale } = awaitedParams;
  const data: HomeData = await getHomeData();

  return <HomePage locale={locale} data={data} />;
}
