import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, DollarSign, BarChart3, ShieldCheck, Plane, Briefcase, PiggyBank, Zap, ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

const categoryIcon = {
  finance: DollarSign, economy: BarChart3, insurance: ShieldCheck,
  travel: Plane, consulting: Briefcase, retirement: PiggyBank, markets: BarChart3,
};
const categoryColor = {
  finance: "text-emerald-400", economy: "text-blue-400", insurance: "text-violet-400",
  travel: "text-amber-400", consulting: "text-rose-400", retirement: "text-teal-400",
};

const FALLBACK = [
  { slug: "personal-finance-101", section: "Finance", category: "finance", title: "Building Wealth on Any Income: The Framework That Actually Works", intro: "Five principles that separate those who accumulate from those who don't, regardless of salary.", read_time: "9 min", published_date: "2026-06-08" },
  { slug: "inflation-decoded", section: "Economy", category: "economy", title: "Inflation Decoded: What the Numbers Never Tell You", intro: "Why headline CPI misses the picture most consumers and investors actually live in.", read_time: "7 min", published_date: "2026-06-08" },
  { slug: "insurance-gaps", section: "Insurance", category: "insurance", title: "The Insurance Gaps That Could Ruin Your Business Overnight", intro: "Most SMBs carry inadequate coverage in exactly the three areas most likely to cause catastrophic loss.", read_time: "8 min", published_date: "2026-06-08" },
  { slug: "business-travel-reimagined", section: "Travel", category: "travel", title: "Business Travel in 2026: How to Spend Less and Arrive Better", intro: "Points optimization, premium cabin access, and the new rules of corporate travel policy.", read_time: "6 min", published_date: "2026-06-08" },
  { slug: "consulting-growth", section: "Business Consulting", category: "consulting", title: "The Five-Question Framework Every Business Owner Needs Before Scaling", intro: "Before you hire, expand, or raise capital, answer these.", read_time: "11 min", published_date: "2026-06-08" },
  { slug: "credit-economy-2026", section: "Economy", category: "economy", title: "The Credit Cycle Is Turning: What It Means for Your Portfolio", intro: "Rising spreads, tightening conditions, and what history says about the next 18 months.", read_time: "10 min", published_date: "2026-06-08" },
];

export default function MagazineLatestGrid() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Article.filter({ is_published: true }, "-published_date", 6)
      .then(data => { setArticles(data && data.length > 0 ? data : FALLBACK); setLoading(false); })
      .catch(() => { setArticles(FALLBACK); setLoading(false); });
  }, []);

  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Latest</p>
              <span className="rounded-full bg-blue-500/15 border border-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400 uppercase tracking-wide flex items-center gap-1">
                <Zap className="h-3 w-3" /> AI-Updated Daily
              </span>
            </div>
            <h2 className="font-display text-4xl tracking-[-0.05em] text-white sm:text-5xl">Fresh intelligence.</h2>
          </div>
          <Link to="/magazine/archive" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors hidden sm:block">
            Browse all →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[1,2,3].map(i => <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7 animate-pulse h-56" />)}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((article, i) => {
              const Icon = categoryIcon[article.category] || BarChart3;
              const color = categoryColor[article.category] || "text-blue-400";
              return (
                <motion.div key={article.slug || article.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Link to={`/magazine/article/${article.slug || article.id}`}
                    className="group flex flex-col h-full rounded-2xl border border-slate-700/60 bg-slate-900/60 p-7 hover:-translate-y-1 hover:shadow-lg hover:border-slate-600/80 hover:bg-slate-900/90 transition-all">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="rounded-xl bg-slate-800 border border-slate-700/50 p-3">
                        <Icon className={`h-5 w-5 ${color}`} />
                      </div>
                      <ArrowUpRight className={`h-4 w-4 ${color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <p className={`text-xs uppercase tracking-[0.28em] mb-2 font-semibold ${color}`}>{article.section}</p>
                    <h3 className="flex-1 text-lg font-semibold leading-snug tracking-[-0.02em] text-white group-hover:text-slate-100 transition-colors">{article.title}</h3>
                    <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-2">{article.intro || article.subtitle}</p>
                    <div className="mt-5 flex items-center gap-3 text-xs text-slate-600 border-t border-slate-800 pt-4">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.read_time || article.readTime}</span>
                      <span>{article.published_date || article.date}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-6 sm:hidden text-center">
          <Link to="/magazine/archive" className="text-sm font-semibold text-blue-400 hover:text-blue-300">Browse all articles →</Link>
        </div>
      </div>
    </section>
  );
}