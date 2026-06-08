import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const FALLBACK_HEADLINES = [
  { text: "S&P 500 +0.42%", change: "up" },
  { text: "NASDAQ +0.61%  · Tech leads gains", change: "up" },
  { text: "10Y Treasury 4.38% · Yield curve steepening", change: "neutral" },
  { text: "Gold $2,341/oz  · Safe-haven demand rising", change: "up" },
  { text: "Oil WTI $82.10  · OPEC+ holds production cuts", change: "neutral" },
  { text: "Bitcoin $71,240 · Institutional inflows accelerate", change: "up" },
  { text: "EUR/USD 1.0842  · Euro strengthens on PMI beat", change: "up" },
  { text: "VIX 14.3  · Volatility near multi-month lows", change: "down" },
  { text: "DOW -0.08%  · Blue chips drift lower", change: "down" },
  { text: "CPI +3.1% YoY  · Cooling trend continues", change: "neutral" },
];

export default function NewsTicker() {
  const [headlines, setHeadlines] = useState(FALLBACK_HEADLINES);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const speedRef = useRef(0.7);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await base44.integrations.Core.InvokeLLM({
          prompt: `Generate 10 financial market ticker items for today (${new Date().toDateString()}).
          Include stocks, bonds, commodities, crypto, forex.
          Each item: short metric label, value, and tiny context (5-12 words total).
          Also include a "change" field: "up", "down", or "neutral" based on sentiment.
          Return as JSON array of objects: [{text: string, change: "up"|"down"|"neutral"}]`,
          response_json_schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                change: { type: "string" }
              }
            }
          }
        });
        if (Array.isArray(res) && res.length > 0) setHeadlines(res);
      } catch {
        // keep fallback
      }
    };
    fetchHeadlines();
    const interval = setInterval(fetchHeadlines, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = () => {
      setOffset(prev => {
        const totalWidth = track.scrollWidth / 2;
        const next = prev + speedRef.current;
        return next >= totalWidth ? 0 : next;
      });
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [headlines]);

  const allHeadlines = [...headlines, ...headlines];

  const getColor = (change) => {
    if (change === "up") return "text-emerald-400";
    if (change === "down") return "text-red-400";
    return "text-slate-400";
  };

  const getIcon = (change) => {
    if (change === "up") return <TrendingUp className="h-3 w-3 text-emerald-400 shrink-0" />;
    if (change === "down") return <TrendingDown className="h-3 w-3 text-red-400 shrink-0" />;
    return <Minus className="h-3 w-3 text-slate-500 shrink-0" />;
  };

  return (
    <div className="border-b border-blue-500/20 bg-[#050A14] py-1.5 overflow-hidden">
      <div className="flex items-center">
        <div className="shrink-0 flex items-center gap-2 border-r border-blue-500/30 px-4 py-1 bg-blue-600/20 z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap text-blue-400">Live Markets</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex whitespace-nowrap"
            style={{ transform: `translateX(-${offset}px)`, willChange: "transform" }}
          >
            {allHeadlines.map((h, i) => (
              <span key={i} className={`inline-flex items-center gap-1.5 px-5 text-xs font-medium ${getColor(h.change)}`}>
                {getIcon(h.change)}
                {h.text}
                <span className="text-slate-700 mx-2">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}