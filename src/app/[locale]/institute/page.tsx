import { getInstituteData } from "@/lib/api";
import InstitutePage from "@/components/pages/InstitutePage";

export default async function Institute({ params }: { params: { locale: string } }) {
  const data = await getInstituteData(params.locale);
  return <InstitutePage locale={params.locale} data={data} />;
}