import { NextRequest, NextResponse } from "next/server";
import {
  getStoredUpload,
  isUploadFolder,
  sanitizeUploadFilename,
} from "@/lib/uploads/stored-uploads";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ folder: string; filename: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { folder: folderRaw, filename: filenameRaw } = await params;

  if (!isUploadFolder(folderRaw)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filename = sanitizeUploadFilename(filenameRaw);
  if (!filename) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const doc = await getStoredUpload(folderRaw, filename);
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(doc.data), {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Length": String(doc.size),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
