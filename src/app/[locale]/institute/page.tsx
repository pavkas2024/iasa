import { redirect } from "next/navigation";

type Locale = "uk" | "en";

export default async function InstituteIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  redirect(`/${locale}/institute/about`);
}
