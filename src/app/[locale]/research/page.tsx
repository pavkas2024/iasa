import { redirect } from "next/navigation";

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}

export default async function ResearchIndex({ params }: PageProps) {
  const { locale } = await params;


  redirect(`/${locale}/research/publications`);
}
