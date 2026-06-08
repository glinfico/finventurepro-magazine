import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MagazineHeader from "@/components/magazine/MagazineHeader";
import MagazineFooter from "@/components/magazine/MagazineFooter";
import { Clock, Search, BarChart3, ShieldCheck, Plane, Briefcase, DollarSign, X, Globe, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const EDITORIAL = [
  { slug: "personal-finance-101", section: "Finance", category: "finance", title: "Building Wealth on Any Income: The Framework That Actually Works", subtitle: "Five principles that separate those who accumulate from those who don't, regardless of salary.", read_time: "9 min", published_date: "2026-06-01" },
  { slug: "inflation-decoded", section: "Economy", category: "economy", title: "Inflation Decoded: What the Numbers Never Tell You", subtitle: "Why headline CPI misses the picture most consumers and investors actually live in.", read_time: "7 min", published_date: "2026-06-02" },
  { slug: "insurance-gaps", section: "Insurance", category: "insurance", title: "The Insurance Gaps That Could Ruin Your Business Overnight", subtitle: "Most SMBs carry inadequate coverage in exactly the three areas most likely to cause catastrophic loss.", read_time: "8 min", published_date: "2026-06-03" },
  { slug: "business-travel-reimagined", section: "Travel", category: "travel", title: "Business Travel in 2026: How to Spend Less and Arrive Better", subtitle: "Points optimization, premium cabin access, and the new rules of corporate travel policy.", read_time: "6 min", published_date: "2026-06-04" },
  { slug: "consulting-growth", section: "Business Consulting", category: "consulting", title: "The Five-Question Framework Every Business Owner Needs Before Scaling", subtitle: "Before you hire, expand, or raise capital, answer these. Your growth trajectory depends on it.", read_time: "11 min", published_date: "2026-06-05" },
  { slug: "credit-economy-2026", section: "Economy", category: "economy", title: "The Credit Cycle Is Turning: What It Means for Your Portfolio", subtitle: "Rising spreads, tightening conditions, and what history says about the next 18 months.", read_time: "10 min", published_date: "2026-06-06" },
  { slug: "retirement-planning-2026", section: "Retirement", category: "retirement", title: "Retirement Planning in Uncertain Markets: A 2026 Guide", subtitle: "How to build a resilient retirement portfolio when everything seems volatile.", read_time: "10 min", published_date: "2026-06-07" },
  { slug: "401k-maximization", section: "Retirement", category: "retirement", title: "Maxing Your 401(k) in 2026: New Limits, New Strategies", subtitle: "Contribution limits changed again — here is how to take full advantage at every income level.", read_time: "8 min", published_date: "2026-06-08" },
];

const categoryMeta = {
  finance:    { label: "Finance",             icon: DollarSign,  color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  economy:    { label: "Economy",             icon: BarChart3,   color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  insurance:  { label: "Insurance",           icon: ShieldCheck, color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  travel:     { label: "Travel",              icon: Plane,       color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  consulting: { label: "Business Consulting", icon: Briefcase,   color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  retirement: { label: "Retirement",          icon: Briefcase,   color: "bg-teal-500/20 text-teal-300 border-teal-500/30" },
};

const CATS = ["All", "finance", "economy", "insurance", "travel", "consulting", "retirement"];

export default function MagazineArchive() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dbArticles, setDbArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");

  const activeCategory = searchParams.get("cat") || "All";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    base44.entities.Article.filter({ is_published: true }, "-published_date", 100)
      .then(data => { setDbArticles(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { setLocalSearch(searchQuery); }, [searchQuery]);

  const allArticles = [
    ...dbArticles,
    ...EDITORIAL.filter(e => !dbArticles.some(d => d.slug === e.slug)),
  ];

  const filtered = allArticles.filter(a => {
    const catMatch = activeCategory === "All" || a.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const searchMatch = !q || a.title?.toLowerCase().includes(q) || a.subtitle?.toLowerCase().includes(q) || a.intro?.toLowerCase().includes(q) || a.section?.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const p = new URLSearchParams(searchParams);
    if (localSearch.trim()) p.set("search", localSearch.trim()); else p.delete("search");
    setSearchParams(p);
  };

  const clearSearch = () => {
    setLocalSearch("");
    const p = new URLSearchParams(searchParams);
    p.delete("search");
    setSearchParams(p);
  };

  const setCat = (cat) => {
    const p = new URLSearchParams(searchParams);
    if (cat === "All") p.delete("cat"); else p.set("cat", cat);
    setSearchParams(p);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MagazineHeader />

      {/* FOD sticky banner */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-primary/95 backdrop-blur border-t border-white/10 py-2.5 px-5">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-primary-foreground hidden sm:block">
            Need capital? GLINFICO Financial Operations Division — fast access to MCA, real estate, and M&amp;A funding.
          </p>
          <p className="text-sm font-semibold text-primary-foreground sm:hidden">GLINFICO FOD — Fast capital access.</p>
          <a href="https://fod.glinfico.com" target="_blank" rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 rounded-full bg-primary-foreground px-4 py-1.5 text-xs font-bold text-primary hover:opacity-90 transition-opacity">
            fod.glinfico.com <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="px-5 pt-32 pb-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground mb-3">FinVenturePro Archive</p>
            <h1 className="font-display text-5xl tracking-[-0.05em] sm:text-6xl">Every Article.</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Browse all editorial content across Finance, Economy, Insurance, Travel, Business Consulting, and Retirement.</p>
          </motion.div>

          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="mb-8 flex gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                placeholder="Search articles, topics, keywords..."
                className="w-full rounded-full border border-border bg-card pl-11 pr-10 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary/60 focus:outline-none transition-all"
              />
              {localSearch && (
                <button type="button" onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">Search</button>
          </form>

          {/* Category filters */}
          <div className="mb-10 flex flex-wrap gap-2">
            {CATS.map(cat => (
              <button key={cat} onClick={() => setCat(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${activeCategory === cat ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>
                {cat === "All" ? "All Articles" : categoryMeta[cat]?.label || cat}
              </button>
            ))}
          </div>

          {searchQuery && (
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>{filtered.length} result{filtered.length !== 1 ? "s" : ""} for <strong className="text-foreground">"{searchQuery}"</strong></span>
              <button onClick={clearSearch} className="text-primary hover:underline ml-1">Clear</button>
            </div>
          )}

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1,2,3,4,5,6].map(i => <div key={i} className="rounded-[1.5rem] border border-border bg-card p-7 animate-pulse h-52" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <Globe className="mx-auto h-10 w-10 mb-4 opacity-30" />
              <p className="text-lg">No articles found.</p>
              <button onClick={clearSearch} className="mt-3 text-sm text-primary hover:underline">Clear search</button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article, i) => {
                const meta = categoryMeta[article.category] || categoryMeta.finance;
                const Icon = meta.icon;
                return (
                  <motion.div key={article.slug || article.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}>
                    <Link to={`/magazine/article/${article.slug || article.id}`}
                      className="group flex flex-col h-full rounded-[1.5rem] border border-border bg-card p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all">
                      <div className="mb-6 flex items-start justify-between gap-2">
                        <div className="rounded-2xl bg-secondary p-3 shrink-0"><Icon className="h-5 w-5 text-primary" /></div>
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${meta.color}`}>{article.section}</span>
                      </div>
                      <h3 className="flex-1 text-lg font-semibold leading-snug tracking-[-0.02em] group-hover:text-primary transition-colors">{article.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.subtitle || article.intro}</p>
                      <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.read_time || article.readTime}</span>
                        <span>{article.published_date || article.date}</span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <MagazineFooter />
    </main>
  );
}