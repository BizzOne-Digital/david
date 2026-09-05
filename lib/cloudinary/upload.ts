import { v2 as cloudinary } from "cloudinary";

let configured = false;

function ensureConfigured(): boolean {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return false;
  }

  if (!configured) {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true,
    });
    configured = true;
  }

  return true;
}

export interface UploadResult {
  url: string;
  publicId: string;
}

export async function uploadImage(
  file: Buffer | string,
  folder = "rethink-automotive"
): Promise<UploadResult> {
  if (!ensureConfigured()) {
    throw new Error("Cloudinary is not configured");
  }

  const result = await cloudinary.uploader.upload(
    typeof file === "string" ? file : `data:image/jpeg;base64,${file.toString("base64")}`,
    {
      folder,
      resource_type: "image",
    }
  );

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

export async function deleteImage(publicId: string): Promise<boolean> {
  if (!ensureConfigured()) {
    console.warn("[cloudinary] Not configured. Skipping delete for:", publicId);
    return false;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("[cloudinary] Delete failed:", error);
    return false;
  }
}

export function isCloudinaryConfigured(): boolean {
  return ensureConfigured();
}
