import { getMediaAssets } from "@/actions/media";
import { MediaLibrary } from "@/components/admin/MediaLibrary";

export default async function MediaPage() {
  const assets = await getMediaAssets();
  return <MediaLibrary assets={assets} />;
}
