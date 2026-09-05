"use client";

import { useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteMediaAsset, uploadMediaAsset } from "@/actions/media";
import { formatDateTime } from "@/lib/utils";

interface MediaAsset {
  _id: string;
  url: string;
  filename: string;
  alt?: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  createdAt: string;
}

export function MediaLibrary({ assets }: { assets: MediaAsset[] }) {
  const [isPending, startTransition] = useTransition();

  const handleUpload = (formData: FormData) => {
    startTransition(async () => {
      const result = await uploadMediaAsset(formData);
      if (result.success) toast.success("Media uploaded");
      else toast.error(result.error);
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteMediaAsset(id);
      if (result.success) toast.success("Media deleted");
      else toast.error(result.error);
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Media Library</h2>
          <p className="text-sm text-silver">{assets.length} assets</p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button>
              <Upload className="h-4 w-4" />
              Upload Media
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Media Asset</DialogTitle>
            </DialogHeader>
            <form action={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Image URL *</Label>
                <Input id="url" name="url" type="url" required placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publicId">Public ID *</Label>
                <Input id="publicId" name="publicId" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filename">Filename *</Label>
                <Input id="filename" name="filename" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input id="alt" name="alt" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mimeType">MIME Type</Label>
                  <Input id="mimeType" name="mimeType" defaultValue="image/jpeg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Size (bytes)</Label>
                  <Input id="size" name="size" type="number" defaultValue={0} />
                </div>
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Uploading..." : "Upload"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {assets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-silver">
            No media assets yet. Upload your first image.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset) => (
            <Card key={asset._id} className="overflow-hidden">
              <div className="relative aspect-video bg-charcoal">
                {asset.mimeType.startsWith("image/") ? (
                  <Image
                    src={asset.url}
                    alt={asset.alt ?? asset.filename}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-silver">
                    {asset.mimeType}
                  </div>
                )}
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="truncate text-sm">{asset.filename}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4 pt-0">
                <p className="text-xs text-silver">
                  {formatSize(asset.size)} · {formatDateTime(asset.createdAt)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-red-400"
                  disabled={isPending}
                  onClick={() => handleDelete(asset._id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
