import React from "react";

export default function MagazineLogo({ size = "md" }) {
  const sizes = {
    sm: { outer: "h-8 w-8", text: "text-base", sub: "text-[9px]" },
    md: { outer: "h-10 w-10", text: "text-xl", sub: "text-[10px]" },
    lg: { outer: "h-14 w-14", text: "text-3xl", sub: "text-xs" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2.5">
      <div className={`relative ${s.outer} shrink-0`}>
        <div className="absolute inset-0 rounded-xl bg-blue-500 rotate-12 opacity-20" />
        <div className="absolute inset-[3px] rounded-lg bg-blue-500 rotate-6 opacity-40" />
        <div className="absolute inset-[5px] rounded-md bg-blue-600 flex items-center justify-center">
          <span className="text-white font-black text-[10px] tracking-tight">FVP</span>
        </div>
      </div>
      <div>
        <div className={`font-display ${s.text} tracking-[0.18em] text-white leading-none`}>FinVenturePro</div>
        <div className={`${s.sub} uppercase tracking-[0.35em] text-slate-400 leading-none mt-0.5`}>Intelligence</div>
      </div>
    </div>
  );
}