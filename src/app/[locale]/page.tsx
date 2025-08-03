import styles from "./page.module.css";
import { getHomeData } from "@/lib/api";
import HomePage from "@/components/pages/HomePage";

interface PageProps {
  params: { locale: string };
}

export function generateStaticParams() {
  return [
    { locale: "uk" },
    { locale: "en" },
  ];
}

export default async function Home({ params }: { params: { locale: string } }) {
  const data = await getHomeData(params.locale);

  return <HomePage locale={params.locale} data={data} />;
}
