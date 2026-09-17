"use client";

import { useRef, useTransition } from "react";
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
import { resolveImageSrc } from "@/lib/images/resolve-image-src";
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
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (formData: FormData) => {
    startTransition(async () => {
      const result = await uploadMediaAsset(formData);
      if (result.success) {
        toast.success("Media uploaded");
        if (fileRef.current) fileRef.current.value = "";
      } else {
        toast.error(result.error ?? "Upload failed");
      }
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
          <p className="text-sm text-silver">{assets.length} assets (MongoDB-backed)</p>
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
                <Label htmlFor="file">Image file *</Label>
                <Input
                  ref={fileRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input id="alt" name="alt" />
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Uploading..." : "Upload"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {assets.length === 0 ?
        <Card>
          <CardContent className="py-12 text-center text-silver">
            No media assets yet. Upload your first image.
          </CardContent>
        </Card>
      : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset) => {
            const src = resolveImageSrc(asset.url);
            return (
              <Card key={asset._id} className="overflow-hidden">
                <div className="relative aspect-video bg-charcoal">
                  {asset.mimeType.startsWith("image/") ?
                    <Image
                      src={src}
                      alt={asset.alt ?? asset.filename}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      unoptimized={asset.url.startsWith("/api/uploads/")}
                    />
                  : <div className="flex h-full items-center justify-center text-silver">
                      {asset.mimeType}
                    </div>
                  }
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="truncate text-sm">{asset.filename}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-4 pt-0">
                  <p className="break-all text-xs text-silver">{asset.url}</p>
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
            );
          })}
        </div>
      }
    </div>
  );
}
