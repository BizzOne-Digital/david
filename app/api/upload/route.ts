import { NextRequest, NextResponse } from "next/server";
import { requireUploadSession } from "@/lib/auth/upload-auth";
import {
  ALLOWED_UPLOAD_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  isUploadFolder,
  saveStoredUpload,
} from "@/lib/uploads/stored-uploads";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const authResult = await requireUploadSession();
  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderRaw = String(formData.get("folder") ?? "").trim();

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!isUploadFolder(folderRaw)) {
      return NextResponse.json({ error: "Invalid upload folder" }, { status: 400 });
    }

    if (!ALLOWED_UPLOAD_MIME_TYPES.includes(file.type as (typeof ALLOWED_UPLOAD_MIME_TYPES)[number])) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "File too large. Maximum size is 8MB" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const saved = await saveStoredUpload({
      folder: folderRaw,
      buffer,
      mimeType: file.type,
      size: file.size,
    });

    return NextResponse.json({
      success: true,
      url: saved.url,
      filename: saved.filename,
      size: saved.size,
      folder: saved.folder,
    });
  } catch (error) {
    console.error("[upload]", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
