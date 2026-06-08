import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MagazineHero() {
  return (
    <section id="top" className="relative px-5 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-44">
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.12fr_0.88fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Spring Intelligence Issue
          </div>
          <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.06em] text-foreground sm:text-7xl lg:text-8xl">
            Capital moves faster when insight feels inevitable.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            FinVenturePro Magazine decodes venture markets, private wealth, fintech strategy, and global deal flow for operators who make high-conviction decisions.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7">
              <a href="#featured">Read the Cover Story <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7">
              <a href="#subscribe">Join 48,000 readers</a>
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
          <div className="rounded-[2rem] border border-border bg-card p-4 shadow-2xl shadow-primary/10">
            <div className="rounded-[1.5rem] bg-secondary p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-6">
                <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Vol. 14</span>
                <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Premium</span>
              </div>
              <div className="py-14">
                <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">The Allocation Map</p>
                <h2 className="mt-4 font-display text-5xl leading-none tracking-[-0.05em]">Where smart capital lands next</h2>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {["AI Infra", "Climate", "Fintech"].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-background/70 px-3 py-5">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Signal</div>
                    <div className="mt-2 text-sm font-semibold">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}