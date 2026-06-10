import React, { useId } from "react";

export default function MagazineLogo({ size = "md" }) {
  const uid = useId().replace(/:/g, "_");
  const gradId = `fvpGrad_${uid}`;

  const cfg = {
    sm: { badge: 36, fvp: 9,  name: "15px", sub: "8px",  gap: 10 },
    md: { badge: 44, fvp: 10, name: "18px", sub: "9px",  gap: 12 },
    lg: { badge: 60, fvp: 13, name: "28px", sub: "11px", gap: 14 },
  }[size] || { badge: 44, fvp: 10, name: "18px", sub: "9px", gap: 12 };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: cfg.gap, userSelect: "none" }}>
      <svg
        width={cfg.badge}
        height={cfg.badge}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* defs MUST come first so gradient is defined before it's referenced */}
        <defs>
          <linearGradient id={gradId} x1="6" y1="6" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* Back glow layer */}
        <rect x="4" y="2" width="36" height="36" rx="9" fill="#3B82F6" fillOpacity="0.18" transform="rotate(12 22 22)" />
        {/* Mid layer */}
        <rect x="5" y="5" width="34" height="34" rx="8" fill="#2563EB" fillOpacity="0.45" transform="rotate(6 22 22)" />
        {/* Main badge */}
        <rect x="6" y="6" width="32" height="32" rx="7" fill={`url(#${gradId})`} />
        {/* FVP lettering */}
        <text
          x="22" y="27"
          textAnchor="middle"
          fill="white"
          fontFamily="Inter, ui-sans-serif, sans-serif"
          fontWeight="900"
          fontSize={cfg.fvp}
          letterSpacing="-0.5"
        >
          FVP
        </text>
      </svg>

      {/* Wordmark */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <span style={{
          fontFamily: "'Instrument Serif', Georgia, 'Times New Roman', serif",
          fontSize: cfg.name,
          letterSpacing: "0.12em",
          color: "#ffffff",
          lineHeight: 1,
          display: "block",
        }}>
          FinVenturePro
        </span>
        <span style={{
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          fontSize: cfg.sub,
          letterSpacing: "0.32em",
          fontWeight: 600,
          color: "#94a3b8",
          lineHeight: 1,
          marginTop: 3,
          textTransform: "uppercase",
          display: "block",
        }}>
          Intelligence
        </span>
      </div>
    </div>
  );
}