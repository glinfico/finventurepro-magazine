import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturedArticle() {
  return (
    <section id="featured" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/60 shadow-2xl shadow-black/30 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left panel */}
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 p-8 sm:p-12 overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            <div className="relative z-10">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                Cover Story
              </div>
              <DollarSign className="mt-12 h-10 w-10 text-white/60" />
              <p className="mt-6 text-xs uppercase tracking-[0.32em] text-white/60">Finance</p>
              <h2 className="mt-3 font-display text-4xl leading-tight tracking-[-0.04em] text-white sm:text-5xl">
                Building wealth on any income: the framework that actually works
              </h2>
            </div>
          </div>
          {/* Right panel */}
          <div className="p-8 sm:p-12">
            <div className="mb-7 flex flex-wrap gap-2">
              {["Personal Finance", "Wealth Building", "Investing", "Strategy"].map((tag) => (
                <span key={tag} className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400">{tag}</span>
              ))}
            </div>
            <p className="text-xl leading-9 text-white">
              Five principles that separate those who accumulate wealth from those who don't — regardless of starting salary, background, or access to capital.
            </p>
            <p className="mt-5 leading-7 text-slate-400">
              Our editors trace how ordinary earners build extraordinary balance sheets by mastering a simple but ruthless framework: spend less than you earn, invest the rest systematically, and never let tax inefficiency erode compound growth.
            </p>
            <Link to="/magazine/article/personal-finance-101" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              Read the full story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}