import { notFound } from "next/navigation";
import { getStudioById } from "@/lib/studios-db";
import { StudioDetail } from "@/components/studio-detail";

export default async function StudioDetailPage({
  params,
}: PageProps<"/studios/[id]">) {
  const { id } = await params;
  const studio = await getStudioById(id);
  if (!studio) notFound();
  return <StudioDetail studio={studio} />;
}
