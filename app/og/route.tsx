import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const AMBER = "#C8773E";
const INK = "#1A1A1A";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.suppliedpackaging.com";

const sora600 = readFile(
  join(process.cwd(), "public/fonts/sora-600.woff")
);
const sora800 = readFile(
  join(process.cwd(), "public/fonts/sora-800.woff")
);

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") ?? "Supplied";
  const subtitle = searchParams.get("subtitle") ?? "";
  const bg = searchParams.get("bg");

  const bgUrl = bg
    ? bg.startsWith("http")
      ? bg
      : `${siteUrl}${bg.startsWith("/") ? bg : `/${bg}`}`
    : null;

  const [soraRegular, soraBold] = await Promise.all([sora600, sora800]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          fontFamily: "Sora",
          position: "relative",
          backgroundColor: INK,
        }}
      >
        {bgUrl && (
          <img
            src={bgUrl}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background: bgUrl
              ? "linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.7) 40%, rgba(26,26,26,0.3) 70%, rgba(26,26,26,0.15) 100%)"
              : "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(200,119,62,0.18), transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "60px 72px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {subtitle && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: 20,
                  fontWeight: 600,
                  color: AMBER,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {subtitle}
              </div>
            )}
            <div
              style={{
                fontSize: title.length > 30 ? 52 : 64,
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                maxWidth: "900px",
              }}
            >
              {title}
            </div>
          </div>

          {/* Footer bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "40px",
              paddingTop: "24px",
              borderTop: "2px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: AMBER,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              S
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "-0.01em",
              }}
            >
              suppliedpackaging.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Sora", data: soraRegular, weight: 600, style: "normal" as const },
        { name: "Sora", data: soraBold, weight: 800, style: "normal" as const },
      ],
    }
  );
}
