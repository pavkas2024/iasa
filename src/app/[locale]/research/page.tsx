import { getResearchData } from "@/lib/api";
import ResearchPage from "@/components/pages/ResearchPage";
import { ResearchData } from "@/types/api";

type Locale = "uk" | "en";

interface PageProps {
  params: { locale: Locale };
}


export default async function Research({ params }: PageProps) {
    const awaitedParams = await params;  // Чекаємо, поки параметри будуть доступні
    const { locale } = awaitedParams;
    const data: ResearchData = await getResearchData();
  
    return <ResearchPage locale={locale} data={data} />;
  }