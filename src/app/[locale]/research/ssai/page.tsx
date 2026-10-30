
import { getSsaiInfo, getSsaiSessions } from "@/lib/api";
import SsaiPageContent from "@/components/SsaiPageContent/SsaiPageContent";

type Locale = "uk" | "en";

export const metadata = {
  title: "Системні науки та штучний інтелект (SSAI) | Systems Science and Artificial Intelligence",
  description:
    "Міжнародний науково-технічний семінар SSAI. International Scientific and Technical Seminar SSAI.",
};

export default async function SsaiPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const [info, upcoming, completed] = await Promise.all([
    getSsaiInfo(),
    getSsaiSessions(false, 1, 100),
    getSsaiSessions(true, 1, 100),
  ]);

  return (
    <SsaiPageContent
      locale={locale}
      info={info}
      upcoming={upcoming.items}
      completed={completed.items}
    />
  );
}
