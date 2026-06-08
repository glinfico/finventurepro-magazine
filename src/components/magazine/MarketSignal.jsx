import React from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, TrendingUp, TrendingDown } from "lucide-react";

const signals = [
  { label: "Consumer savings rate", value: "3.2%", note: "Below historical average — financing demand accelerating", trend: "down", color: "text-red-400" },
  { label: "Insurance premium growth", value: "+9%", note: "YoY commercial lines — largest spike in a decade", trend: "up", color: "text-emerald-400" },
  { label: "Business travel rebound", value: "114%", note: "Of 2019 levels — corporate bookings exceed pre-pandemic peak", trend: "up", color: "text-emerald-400" },
];

export default function MarketSignal() {
  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="relative rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/60 to-slate-900/80 p-8 sm:p-10 overflow-hidden">
          <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />
          <Activity className="h-8 w-8 text-blue-400 relative z-10" />
          <h2 className="mt-8 font-display text-4xl tracking-[-0.05em] text-white sm:text-5xl relative z-10">The Signal Desk</h2>
          <p className="mt-5 leading-7 text-slate-400 relative z-10">Weekly editorial intelligence across Finance, Economy, Insurance, Travel, and Business Consulting — distilled into actionable reads.</p>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-blue-400 relative z-10">
            <ShieldCheck className="h-4 w-4" /> Verified by FinVenturePro editors
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {signals.map((signal, i) => (
            <motion.div key={signal.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 hover:border-slate-600/80 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">{signal.label}</p>
                  <div className={`mt-2 font-display text-5xl tracking-[-0.06em] ${signal.color}`}>{signal.value}</div>
                </div>
                {signal.trend === "up"
                  ? <TrendingUp className="h-5 w-5 text-emerald-400 mt-1 shrink-0" />
                  : <TrendingDown className="h-5 w-5 text-red-400 mt-1 shrink-0" />}
              </div>
              <p className="mt-3 text-sm text-slate-500">{signal.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}