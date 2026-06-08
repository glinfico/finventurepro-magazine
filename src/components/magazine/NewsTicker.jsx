import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { TrendingUp } from "lucide-react";

const FALLBACK_HEADLINES = [
  "S&P 500 edges higher as Fed signals rate pause through Q3 2026",
  "Oil prices stabilize near $82/bbl amid OPEC+ production cuts",
  "10-Year Treasury yield holds at 4.38% ahead of CPI release",
  "Bitcoin surpasses $71,000 as institutional inflows accelerate",
  "Euro strengthens against dollar on improved Eurozone PMI data",
  "Corporate earnings season beats consensus by widest margin since 2021",
];

export default function NewsTicker() {
  const [headlines, setHeadlines] = useState(FALLBACK_HEADLINES);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const speedRef = useRef(0.6); // px per frame

  // Fetch AI headlines on mount, refresh every 30 min
  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await base44.integrations.Core.InvokeLLM({
          prompt: `Generate 8 concise financial news ticker headlines for today (${new Date().toDateString()}). 
          Cover: stock markets, bonds, commodities, crypto, forex, and macro data. 
          Each headline should be 10-18 words, factual-sounding, present-tense, and market-relevant.
          Return as a JSON array of strings only. No explanations.`,
          response_json_schema: {
            type: "array",
            items: { type: "string" }
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

  // Smooth scroll animation
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

  const allHeadlines = [...headlines, ...headlines]; // duplicate for seamless loop

  return (
    <div className="border-b border-border/50 bg-primary/5 py-1.5 overflow-hidden">
      <div className="flex items-center">
        {/* Label */}
        <div className="shrink-0 flex items-center gap-1.5 border-r border-border px-3 py-0.5 bg-primary text-primary-foreground z-10">
          <TrendingUp className="h-3 w-3" />
          <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Markets</span>
        </div>

        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex whitespace-nowrap"
            style={{ transform: `translateX(-${offset}px)`, willChange: "transform" }}
          >
            {allHeadlines.map((h, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-6 text-xs text-foreground/80 font-medium">
                {h}
                <span className="text-muted-foreground/40 mx-1">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}