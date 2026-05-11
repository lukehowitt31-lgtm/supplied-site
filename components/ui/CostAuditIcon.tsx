import React from "react";

export type CostAuditIconName =
  | "benchmark"
  | "map"
  | "compliance"
  | "redesign"
  | "spec"
  | "suppliers"
  | "invoice"
  | "submit"
  | "email"
  | "call"
  | "savings"
  | "clock"
  | "lock"
  | "lightbulb";

interface CostAuditIconProps {
  name: CostAuditIconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function CostAuditIcon({
  name,
  className = "",
  size = 24,
  strokeWidth = 1.6,
}: CostAuditIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "benchmark":
      return (
        <svg {...common}>
          <path d="M3 20h18" />
          <rect x="5" y="11" width="3" height="6" rx="0.5" />
          <rect x="10.5" y="7" width="3" height="10" rx="0.5" />
          <rect x="16" y="13" width="3" height="4" rx="0.5" />
          <path d="M5 8l4-3 4 2 6-3.5" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
          <path d="M9 4v14" />
          <path d="M15 6v14" />
        </svg>
      );
    case "compliance":
      return (
        <svg {...common}>
          <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "redesign":
      return (
        <svg {...common}>
          <path d="M12 3v3" />
          <path d="M12 18v3" />
          <path d="M5.6 5.6 7.7 7.7" />
          <path d="m16.3 16.3 2.1 2.1" />
          <path d="M3 12h3" />
          <path d="M18 12h3" />
          <path d="M5.6 18.4 7.7 16.3" />
          <path d="m16.3 7.7 2.1-2.1" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      );
    case "spec":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </svg>
      );
    case "suppliers":
      return (
        <svg {...common}>
          <circle cx="8" cy="9" r="3" />
          <path d="M2.5 19a5.5 5.5 0 0 1 11 0" />
          <circle cx="17" cy="11" r="2.5" />
          <path d="M14 19a4.5 4.5 0 0 1 7.5-3.4" />
        </svg>
      );
    case "invoice":
      return (
        <svg {...common}>
          <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h3" />
        </svg>
      );
    case "submit":
      return (
        <svg {...common}>
          <path d="M12 4v12" />
          <path d="m6 10 6-6 6 6" />
          <path d="M4 18h16" />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "call":
      return (
        <svg {...common}>
          <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "savings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 16 8-8" />
          <circle cx="9" cy="9" r="1.4" />
          <circle cx="15" cy="15" r="1.4" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "lightbulb":
      return (
        <svg {...common}>
          <path d="M9 17h6" />
          <path d="M10 20h4" />
          <path d="M12 3a6 6 0 0 1 4 10.5c-.7.7-1 1.5-1 2.5H9c0-1-.3-1.8-1-2.5A6 6 0 0 1 12 3Z" />
        </svg>
      );
    default:
      return null;
  }
}
