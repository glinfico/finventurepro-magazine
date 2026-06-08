import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MagazineLogo from "@/components/magazine/MagazineLogo";

const CATEGORIES = ["Finance", "Economy", "Insurance", "Travel", "Consulting", "Retirement"];

export default function MagazineHero() {
  return (
    <section id="top" className="relative px-5 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-44 overflow-hidden">
      {/* Glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] relative z-10">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
            <Zap className="h-3.5 w-3.5" /> Summer 2026 Issue
          </div>
          <h1 className="font-display text-5xl leading-[0.93] tracking-[-0.05em] text-white sm:text-7xl lg:text-[5.5rem]">
            Intelligence<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">that moves</span><br />
            money forward.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
            FinVenturePro covers Finance, Economy, Insurance, Travel, and Business Consulting — sharp analysis for people who make decisions that matter.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7 bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-600/30">
              <Link to="/magazine/archive">Read the Archive <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              <a href="#subscribe">Subscribe Free</a>
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.85, delay: 0.18 }}>
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur p-5 shadow-2xl shadow-black/50">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-4 mb-4">
              <MagazineLogo size="sm" />
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">● Free Access</span>
            </div>
            {/* Tagline */}
            <div className="py-6 px-2">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500 mb-3">Six Sections</p>
              <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] text-white">All the intelligence you need, one publication.</h2>
            </div>
            {/* Category pills */}
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((item) => (
                <div key={item} className="rounded-xl border border-slate-700/60 bg-slate-800/60 px-2 py-3 text-center hover:border-blue-500/40 hover:bg-blue-500/5 transition-colors">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-slate-400 leading-tight font-medium">{item}</div>
                </div>
              ))}
            </div>
            {/* Stats bar */}
            <div className="mt-4 grid grid-cols-3 divide-x divide-slate-700/50 border-t border-slate-700/50 pt-4">
              {[["6", "Sections"], ["Daily", "AI Updates"], ["Free", "Forever"]].map(([val, label]) => (
                <div key={label} className="text-center px-2">
                  <div className="text-base font-bold text-blue-400">{val}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}