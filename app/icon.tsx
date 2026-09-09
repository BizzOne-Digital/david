import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const buffer = await readFile(join(process.cwd(), "public/images/rethink-logo.jpg"));
  const logoSrc = `data:image/jpeg;base64,${buffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse favicon generation requires a raw img tag */}
        <img
          src={logoSrc}
          alt=""
          width={72}
          height={72}
          style={{
            objectFit: "cover",
            objectPosition: "50% 8%",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
