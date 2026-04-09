import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const AMBER = "#C8773E";
const INK = "#1A1A1A";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") ?? "Supplied";
  const subtitle = searchParams.get("subtitle") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 72px",
          backgroundColor: INK,
          backgroundImage: `radial-gradient(ellipse 60% 50% at 80% 30%, rgba(200,119,62,0.18), transparent 70%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {subtitle && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: 22,
                fontWeight: 600,
                color: AMBER,
                letterSpacing: "0.08em",
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "40px",
            paddingTop: "28px",
            borderTop: `2px solid rgba(255,255,255,0.08)`,
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
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
