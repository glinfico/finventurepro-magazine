import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Landmark } from "lucide-react";

export default function FeaturedArticle() {
  return (
    <section id="featured" className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-primary/5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-primary p-8 text-primary-foreground sm:p-12">
            <Landmark className="h-10 w-10" />
            <p className="mt-16 text-sm uppercase tracking-[0.32em] opacity-70">Cover Story</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">The new private market operating system</h2>
          </div>
          <div className="p-8 sm:p-12">
            <div className="mb-8 flex flex-wrap gap-2">
              {['Venture Capital', 'LP Strategy', 'Macro'].map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{tag}</span>
              ))}
            </div>
            <p className="text-xl leading-9 text-foreground">
              Top-tier investors are replacing quarterly intuition with live underwriting systems, operator networks, and sector-specific intelligence loops.
            </p>
            <p className="mt-5 leading-7 text-muted-foreground">
              Our editors trace how emerging managers, family offices, and corporate venture teams are rebuilding allocation discipline for an era of compressed cycles.
            </p>
            <a href="#markets" className="mt-8 inline-flex items-center text-sm font-semibold text-primary">
              Explore the insights <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}