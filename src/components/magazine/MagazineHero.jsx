import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MagazineLogo from "@/components/magazine/MagazineLogo";

export default function MagazineHero() {
  return (
    <section id="top" className="relative px-5 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-44">
      <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.12fr_0.88fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Summer 2026 Issue
          </div>
          <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.06em] text-foreground sm:text-7xl lg:text-8xl">
            Intelligence that moves money forward.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            FinVenturePro covers Finance, Economy, Insurance, Travel, and Business Consulting — sharp analysis for people who make decisions that matter.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/magazine/archive">Read the Archive <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7">
              <a href="#subscribe">Subscribe Free</a>
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
          <div className="rounded-[2rem] border border-border bg-card p-4 shadow-2xl shadow-primary/10">
            <div className="rounded-[1.5rem] bg-secondary p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-6">
                <MagazineLogo size="sm" />
                <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Free Access</span>
              </div>
              <div className="py-10">
                <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">Five Sections</p>
                <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.05em]">All the intelligence you need, one publication.</h2>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center">
                {["Finance", "Economy", "Insurance", "Travel", "Consulting"].map((item) => (
                  <div key={item} className="rounded-xl border border-border bg-background/70 px-2 py-3">
                    <div className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground leading-tight">{item}</div>
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