import React from "react";
import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, Plane, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  { slug: "inflation-decoded", icon: BarChart3, section: "Economy", title: "Inflation decoded: what the numbers never tell you", time: "7 min", color: "text-blue-400", border: "hover:border-blue-500/40", glow: "group-hover:shadow-blue-500/10" },
  { slug: "insurance-gaps", icon: ShieldCheck, section: "Insurance", title: "The insurance gaps that could ruin your business overnight", time: "8 min", color: "text-violet-400", border: "hover:border-violet-500/40", glow: "group-hover:shadow-violet-500/10" },
  { slug: "business-travel-reimagined", icon: Plane, section: "Travel", title: "Business travel in 2026: how to spend less and arrive better", time: "6 min", color: "text-amber-400", border: "hover:border-amber-500/40", glow: "group-hover:shadow-amber-500/10" },
];

export default function IssueHighlights() {
  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Inside This Issue</p>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.05em] text-white sm:text-5xl">High-signal reads<br />for smart decisions.</h2>
          </div>
          <p className="max-w-sm text-slate-500 text-sm leading-6">Economy, Insurance, Travel — plus Finance and Business Consulting. Free to all readers.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <motion.div key={article.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
                <Link to={`/magazine/article/${article.slug}`}
                  className={`group flex flex-col h-full rounded-2xl border border-slate-700/60 bg-slate-900/60 p-7 transition-all hover:-translate-y-1 hover:shadow-xl ${article.glow} ${article.border} hover:bg-slate-900/90`}>
                  <div className="mb-10 flex items-center justify-between">
                    <div className={`rounded-xl bg-slate-800 border border-slate-700/50 p-3`}>
                      <Icon className={`h-5 w-5 ${article.color}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{article.time} read</span>
                      <ArrowUpRight className={`h-4 w-4 ${article.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                  </div>
                  <p className={`text-xs uppercase tracking-[0.28em] font-semibold ${article.color}`}>{article.section}</p>
                  <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.03em] text-white group-hover:text-slate-100 transition-colors">{article.title}</h3>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}