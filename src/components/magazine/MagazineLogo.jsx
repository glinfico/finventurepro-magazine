import React from "react";

export default function MagazineLogo({ size = "md" }) {
  const sizes = {
    sm: { outer: "h-8 w-8", inner: "h-4 w-4", text: "text-base", sub: "text-[9px]" },
    md: { outer: "h-10 w-10", inner: "h-5 w-5", text: "text-xl", sub: "text-[10px]" },
    lg: { outer: "h-14 w-14", inner: "h-7 w-7", text: "text-3xl", sub: "text-xs" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2.5">
      {/* Geometric mark */}
      <div className={`relative ${s.outer} shrink-0`}>
        <div className="absolute inset-0 rounded-xl bg-primary rotate-12 opacity-20" />
        <div className="absolute inset-[3px] rounded-lg bg-primary rotate-6 opacity-40" />
        <div className="absolute inset-[5px] rounded-md bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-black text-[10px] tracking-tight">FVP</span>
        </div>
      </div>
      {/* Wordmark */}
      <div>
        <div className={`font-display ${s.text} tracking-[0.18em] text-foreground leading-none`}>FinVenturePro</div>
        <div className={`${s.sub} uppercase tracking-[0.35em] text-muted-foreground leading-none mt-0.5`}>Intelligence</div>
      </div>
    </div>
  );
}