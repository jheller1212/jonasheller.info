import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt =
  "Dr. Jonas Heller — Keynote speaker, consultant & professor of marketing. AR, VR, AI & consumer behavior.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [geistLight, geistMedium, geistMono, portrait] = await Promise.all([
    readFile(join(process.cwd(), "src/app/Geist-Light.ttf")),
    readFile(join(process.cwd(), "src/app/Geist-Medium.ttf")),
    readFile(join(process.cwd(), "src/app/GeistMono-Regular.ttf")),
    readFile(join(process.cwd(), "src/app/og-portrait.jpg")),
  ]);

  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
          position: "relative",
          fontFamily: "Geist",
        }}
      >
        {/* Dot grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(232,232,240,0.07) 2px, transparent 2px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            width: 760,
          }}
        >
          <div
            style={{
              fontFamily: "Geist Mono",
              fontSize: 22,
              letterSpacing: 7,
              color: "#fb923c",
              marginBottom: 28,
            }}
          >
            AR · VR · AI · MARKETING
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              lineHeight: 1.05,
              color: "#e8e8f0",
              letterSpacing: -2,
            }}
          >
            <span style={{ fontWeight: 300 }}>Dr. Jonas</span>
            <span style={{ fontWeight: 500 }}>Heller</span>
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 300,
              lineHeight: 1.45,
              color: "#9898b0",
              marginTop: 32,
              maxWidth: 600,
            }}
          >
            Keynote speaker, consultant &amp; professor of marketing —
            Maastricht University
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 48,
            }}
          >
            <div
              style={{
                width: 28,
                height: 2,
                backgroundColor: "#60a5fa",
                marginRight: 16,
              }}
            />
            <div
              style={{
                fontFamily: "Geist Mono",
                fontSize: 22,
                color: "#60a5fa",
              }}
            >
              jonasheller.info
            </div>
          </div>
        </div>

        {/* Portrait */}
        <div
          style={{
            position: "absolute",
            right: 72,
            top: 80,
            display: "flex",
            width: 350,
            height: 470,
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.14)",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          }}
        >
          <img
            src={portraitSrc}
            alt=""
            width={350}
            height={470}
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(15,15,26,0.45) 0%, rgba(15,15,26,0) 40%)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistLight, weight: 300, style: "normal" },
        { name: "Geist", data: geistMedium, weight: 500, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
      ],
    }
  );
}
