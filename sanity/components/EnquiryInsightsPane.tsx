"use client";

export function EnquiryInsightsPane() {
  return (
    <div
      style={{
        padding: 32,
        maxWidth: 560,
        fontFamily:
          "Sora, ui-sans-serif, system-ui, -apple-system, sans-serif",
        color: "#1A1A1A",
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#8A8A8A",
          marginBottom: 12,
        }}
      >
        Internal
      </p>
      <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 12px" }}>
        Enquiry insights
      </h2>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "#6B6B6B", margin: "0 0 20px" }}>
        Contact form submissions are stored privately (names and emails
        encrypted). Use this to track low-volume / plug-and-play demand. It is
        not listed on the public site — same admin token as Knowledge Hub.
      </p>
      <a
        href="/admin/enquiries"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: "#C8773E",
          color: "#fff",
          textDecoration: "none",
          fontSize: 13,
          fontWeight: 600,
          padding: "10px 16px",
          borderRadius: 8,
        }}
      >
        Open enquiry insights →
      </a>
    </div>
  );
}
