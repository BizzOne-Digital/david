import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const buffer = await readFile(join(process.cwd(), "public/images/rethink-logo.png"));
  const logoSrc = `data:image/png;base64,${buffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#000000",
          overflow: "hidden",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={34}
          height={58}
          style={{
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
