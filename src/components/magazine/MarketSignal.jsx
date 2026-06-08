import React from "react";
import { motion } from "framer-motion";
import { LineChart, ShieldCheck, TrendingUp } from "lucide-react";

const signals = [
  { label: "Deal velocity", value: "+18%", note: "QoQ in applied AI infrastructure" },
  { label: "LP sentiment", value: "72", note: "Confidence index across allocators" },
  { label: "Exit window", value: "Q4", note: "Most-watched reopening scenario" },
];

export default function MarketSignal() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[2rem] bg-secondary p-8 sm:p-10">
          <LineChart className="h-9 w-9 text-primary" />
          <h2 className="mt-8 font-display text-4xl tracking-[-0.05em] sm:text-5xl">The Signal Desk</h2>
          <p className="mt-5 leading-7 text-muted-foreground">A weekly editorial model blending founder data, allocator interviews, and public-market pressure points into a single executive readout.</p>
          <div className="mt-8 flex items-center gap-3 text-sm font-medium text-primary"><ShieldCheck className="h-4 w-4" /> Verified by FinVenturePro editors</div>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {signals.map((signal) => (
            <motion.div key={signal.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[1.5rem] border border-border bg-card p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{signal.label}</p>
                  <div className="mt-2 font-display text-5xl tracking-[-0.06em]">{signal.value}</div>
                </div>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{signal.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}