import { VideoProcess } from "@/components/shared/admin/video-process";

export default async function Page(props: {
  params: Promise<{ jobId: string }>;
}) {
  const params = await props.params;

  return <VideoProcess jobId={params.jobId} />;
}
