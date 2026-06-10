import React from "react";

export default function MagazineLogo({ size = "md" }) {
  const cfg = {
    sm: { badge: "h-9 w-9", fvp: "text-[10px]", name: "text-[15px]", sub: "text-[8px]", gap: "gap-2.5" },
    md: { badge: "h-11 w-11", fvp: "text-xs",    name: "text-lg",     sub: "text-[9px]",  gap: "gap-3" },
    lg: { badge: "h-16 w-16", fvp: "text-sm",    name: "text-3xl",    sub: "text-[11px]", gap: "gap-3.5" },
  }[size] || { badge: "h-11 w-11", fvp: "text-xs", name: "text-lg", sub: "text-[9px]", gap: "gap-3" };

  return (
    <div className={`flex items-center ${cfg.gap} select-none`}>
      {/* Badge */}
      <div className={`relative ${cfg.badge} shrink-0`}>
        <div className="absolute inset-0 rounded-[10px] bg-blue-500 opacity-20 rotate-12" />
        <div className="absolute inset-[2px] rounded-[8px] bg-blue-600 opacity-50 rotate-6" />
        <div className="absolute inset-[4px] rounded-[7px] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-inner">
          <span style={{ fontFamily: "Inter, ui-sans-serif, sans-serif", fontWeight: 900, letterSpacing: "-0.02em" }}
            className={`text-white ${cfg.fvp} leading-none`}>
            FVP
          </span>
        </div>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col justify-center">
        <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: "0.12em" }}
          className={`${cfg.name} text-white leading-none`}>
          FinVenturePro
        </span>
        <span style={{ fontFamily: "Inter, ui-sans-serif, sans-serif", letterSpacing: "0.3em", fontWeight: 600 }}
          className={`${cfg.sub} uppercase text-slate-400 leading-none mt-[3px]`}>
          Intelligence
        </span>
      </div>
    </div>
  );
}