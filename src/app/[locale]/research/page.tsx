import { getResearchData } from "@/lib/api";
import ResearchPage from "@/components/pages/ResearchPage";

export default async function Research({ params }: { params: { locale: string } }) {
  const data = await getResearchData(params.locale);
  return <ResearchPage locale={params.locale} data={data} />;
}