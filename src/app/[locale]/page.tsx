import { getHomeData } from "@/lib/api";
import HomePage from "@/components/pages/HomePage";
import type { HomeData } from "@/types/api";

type Locale = "uk" | "en";

export function generateStaticParams() {
  return [
    { locale: "uk" },
    { locale: "en" },
  ];
}

export const metadata = {
  title: "ІПСА – Інститут прикладного системного аналізу | IASA – Institute of Applied System Analysis",
  description: "Офіційний сайт Інституту прикладного системного аналізу. Official website of the Institute of Applied System Analysis.",
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const data: HomeData = await getHomeData();

  return <HomePage locale={locale} data={data} />;
}
