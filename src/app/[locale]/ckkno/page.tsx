
import React from "react";
import CkknoPageContent from "@/components/CkknoPageContent/CkknoPageContent";
import { getCkknoInfo } from "@/lib/api";

type Locale = "uk" | "en";

export const metadata = {
  title: "AI-SYNAPTIC CORE | ЦККНО | SREC",
  description:
    "Центр колективного користування науковим обладнанням AI-SYNAPTIC CORE. Shared Research Equipment Center.",
};

export default async function CkknoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const info = await getCkknoInfo();

  return <CkknoPageContent locale={locale} info={info} />;
}
