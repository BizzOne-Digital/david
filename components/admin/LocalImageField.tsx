"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { deleteStoredUploadByUrlAction } from "@/actions/uploads";
import { resolveImageSrc } from "@/lib/images/resolve-image-src";
import type { UploadFolder } from "@/lib/uploads/upload-url";
import { cn } from "@/lib/utils";

interface LocalImageFieldProps {
  label?: string;
  folder: UploadFolder;
  value?: string;
  onChange: (url: string) => void;
  name?: string;
  className?: string;
}

export function LocalImageField({
  label = "Image",
  folder,
  value = "",
  onChange,
  name,
  className,
}: LocalImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const previewSrc = resolveImageSrc(value);
  const isApiUpload = value.startsWith("/api/uploads/");

  const removeStored = async (url: string) => {
    if (!url.startsWith("/api/uploads/")) return;
    const result = await deleteStoredUploadByUrlAction(url);
    if (!result.success) {
      toast.error(result.error ?? "Could not delete previous upload");
    }
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    setUploading(true);
    try {
      if (value) {
        await removeStored(value);
      }

      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);

      const response = await fetch("/api/upload", { method: "POST", body });
      const payload = (await response.json()) as {
        success?: boolean;
        url?: string;
        error?: string;
      };

      if (!response.ok || !payload.url) {
        toast.error(payload.error ?? "Upload failed");
        return;
      }

      onChange(payload.url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (!value) return;
    setUploading(true);
    try {
      await removeStored(value);
      onChange("");
      toast.success("Image removed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label ?
        <Label>{label}</Label>
      : null}
      {name ?
        <input type="hidden" name={name} value={value} readOnly />
      : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-charcoal">
          {value || previewSrc ?
            <Image
              src={previewSrc}
              alt=""
              fill
              className="object-contain p-1"
              sizes="160px"
              unoptimized={isApiUpload}
            />
          : (
            <div className="flex h-full items-center justify-center text-xs text-silver">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            disabled={uploading}
            onChange={(e) => void handleFile(e.target.files?.[0])}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ?
              <Loader2 className="h-4 w-4 animate-spin" />
            : <Upload className="h-4 w-4" />}
            {value ? "Replace" : "Upload"}
          </Button>
          {value ?
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-400"
              disabled={uploading}
              onClick={() => void handleRemove()}
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
          : null}
        </div>
      </div>
      {value ?
        <p className="break-all text-xs text-silver">{value}</p>
      : null}
    </div>
  );
}
