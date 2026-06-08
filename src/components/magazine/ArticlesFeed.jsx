import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, BarChart3, ShieldCheck, Plane, Briefcase, PiggyBank, Clock, Rss, ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

const CATEGORY_META = {
  finance:    { label: "Finance",             icon: DollarSign,  color: "text-emerald-400", bg: "bg-emerald-500/10", border: "hover:border-emerald-500/30" },
  economy:    { label: "Economy",             icon: BarChart3,   color: "text-blue-400",    bg: "bg-blue-500/10",    border: "hover:border-blue-500/30" },
  insurance:  { label: "Insurance",           icon: ShieldCheck, color: "text-violet-400",  bg: "bg-violet-500/10",  border: "hover:border-violet-500/30" },
  travel:     { label: "Travel",              icon: Plane,       color: "text-amber-400",   bg: "bg-amber-500/10",   border: "hover:border-amber-500/30" },
  consulting: { label: "Business Consulting", icon: Briefcase,   color: "text-rose-400",    bg: "bg-rose-500/10",    border: "hover:border-rose-500/30" },
  retirement: { label: "Retirement",          icon: PiggyBank,   color: "text-teal-400",    bg: "bg-teal-500/10",    border: "hover:border-teal-500/30" },
};

const FALLBACK = [
  { id:"f1", slug:"building-wealth-any-income", section:"Finance", category:"finance", title:"Building Wealth on Any Income: The Framework That Actually Works", intro:"Five principles that separate those who accumulate from those who don't.", read_time:"9 min", published_date:"2026-06-08" },
  { id:"f2", slug:"inflation-decoded", section:"Economy", category:"economy", title:"Inflation Decoded: What the Numbers Never Tell You", intro:"Why headline CPI misses the picture most consumers actually live in.", read_time:"7 min", published_date:"2026-06-08" },
  { id:"f3", slug:"insurance-gaps", section:"Insurance", category:"insurance", title:"The Insurance Gaps That Could Ruin Your Business Overnight", intro:"Most SMBs carry inadequate coverage in exactly the three areas most likely to cause loss.", read_time:"8 min", published_date:"2026-06-08" },
  { id:"f4", slug:"business-travel-2026", section:"Travel", category:"travel", title:"Business Travel in 2026: Spend Less, Arrive Better", intro:"Points optimization, premium cabin access, and the new rules of corporate travel.", read_time:"6 min", published_date:"2026-06-08" },
  { id:"f5", slug:"scaling-framework", section:"Business Consulting", category:"consulting", title:"Five Questions Every Business Owner Needs Before Scaling", intro:"Before you hire, expand, or raise capital — answer these first.", read_time:"11 min", published_date:"2026-06-08" },
  { id:"f6", slug:"retirement-planning-2026", section:"Retirement", category:"retirement", title:"Retirement Planning in Uncertain Markets: A 2026 Guide", intro:"How to build a resilient retirement portfolio when everything seems volatile.", read_time:"10 min", published_date:"2026-06-08" },
];

export default function ArticlesFeed() {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Article.filter({ is_published: true }, "-published_date", 24)
      .then(data => { setArticles(data?.length > 0 ? data : FALLBACK); setLoading(false); })
      .catch(() => { setArticles(FALLBACK); setLoading(false); });
  }, []);

  const categories = ["all", ...Object.keys(CATEGORY_META)];
  const filtered = activeCategory === "all" ? articles : articles.filter(a => a.category === activeCategory);

  return (
    <section className="px-5 py-16 lg:px-8 border-t border-slate-800/60">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Rss className="h-4 w-4 text-blue-400" />
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Live Feed</p>
            </div>
            <h2 className="font-display text-4xl tracking-[-0.05em] text-white sm:text-5xl">All articles.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => {
              const meta = CATEGORY_META[cat];
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all
                    ${activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20"
                      : "border-slate-700 text-slate-400 hover:border-blue-500/40 hover:text-white"}`}>
                  {cat === "all" ? "All" : meta?.label || cat}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5,6].map(i => <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/40 h-52 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">No articles in this category yet.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, i) => {
              const meta = CATEGORY_META[article.category] || { label: article.section, icon: BarChart3, color: "text-blue-400", bg: "bg-blue-500/10", border: "hover:border-blue-500/30" };
              const Icon = meta.icon;
              return (
                <motion.div key={article.id || article.slug} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.06 }}>
                  <Link to={`/magazine/article/${article.slug || article.id}`}
                    className={`group flex flex-col h-full rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 hover:-translate-y-1 hover:shadow-lg transition-all ${meta.border} hover:bg-slate-900/90`}>
                    <div className={`mb-4 rounded-xl ${meta.bg} border border-slate-700/30 p-2.5 w-fit`}>
                      <Icon className={`h-4 w-4 ${meta.color}`} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wide ${meta.color} mb-2`}>{meta.label}</span>
                    <h3 className="flex-1 text-lg font-semibold leading-snug tracking-[-0.02em] text-white group-hover:text-slate-100 transition-colors">{article.title}</h3>
                    {(article.intro || article.subtitle) && (
                      <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">{article.intro || article.subtitle}</p>
                    )}
                    <div className="mt-4 flex items-center gap-3 text-xs text-slate-600 border-t border-slate-800 pt-3">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.read_time || article.readTime}</span>
                      <span className="ml-auto flex items-center gap-1">{article.published_date || article.date} <ArrowUpRight className={`h-3 w-3 ${meta.color} opacity-0 group-hover:opacity-100 transition-opacity`} /></span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/magazine/archive" className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-400 hover:border-blue-500/40 hover:text-white transition-all">
            Browse full archive →
          </Link>
        </div>
      </div>
    </section>
  );
}