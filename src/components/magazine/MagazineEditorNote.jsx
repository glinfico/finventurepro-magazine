import React from "react";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";

const lines = [
  "FinVenturePro was built on a single conviction: the best-informed decision-makers in capital markets do not need more information. They need better signal. Every article we publish is evaluated on one criterion — does this change how a serious operator thinks about allocation?",
  "This issue focuses on structural themes rather than calendar noise. The private market operating system, the credit repricing cycle, the founder-led fund model — these are multi-year dynamics that will compound regardless of what the central bank does on any given Wednesday.",
  "We are also expanding our Funding Intelligence section in partnership with GLINFICO Research to cover alternative lending, commercial real estate capital, and M&A financing with the same analytical rigor we apply to institutional markets.",
];

export default function MagazineEditorNote() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-10 rounded-[2rem] border border-border bg-card p-10 lg:grid-cols-[1fr_2fr] lg:p-14"
        >
          <div>
            <Feather className="h-8 w-8 text-primary mb-6" />
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">From the Editor</p>
            <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] sm:text-4xl">A note on what we publish and why.</h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-8">
            {lines.map((line, i) => <p key={i}>{line}</p>)}
            <p className="font-semibold text-foreground">— The FinVenturePro Editorial Team</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}