import { getIntActivityData } from "@/lib/api";
import IntActivityPage from "@/components/pages/IntActivityPage";

export default async function IntActivity({ params }: { params: { locale: string } }) {
  const data = await getIntActivityData(params.locale);
  return <IntActivityPage locale={params.locale} data={data} />;
}