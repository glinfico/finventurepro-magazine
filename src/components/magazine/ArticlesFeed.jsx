import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

const CATEGORY_META = {
  finance: { label: "Finance", color: "text-emerald-300" },
  economy: { label: "Economy", color: "text-blue-300" },
  insurance: { label: "Insurance", color: "text-violet-300" },
  travel: { label: "Travel", color: "text-amber-300" },
  consulting: { label: "Business Consulting", color: "text-rose-300" },
  retirement: { label: "Retirement", color: "text-teal-300" },
};

const CATEGORY_IMAGES = {
  finance: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  economy: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  insurance: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
  travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
  consulting: "https://images.unsplash.com/photo-1553484771-047a44eee27b?w=1200&q=80",
  retirement: "https://images.unsplash.com/photo-1559526324-593bc0738d25?w=1200&q=80",
};

const FALLBACK = [
  { id: "f1", slug: "building-wealth-any-income", section: "Finance", category: "finance", title: "Building Wealth on Any Income: The Framework That Actually Works", published_date: "2026-06-08" },
  { id: "f2", slug: "inflation-decoded", section: "Economy", category: "economy", title: "Inflation Decoded: What the Numbers Never Tell You", published_date: "2026-06-08" },
  { id: "f3", slug: "insurance-gaps", section: "Insurance", category: "insurance", title: "The Insurance Gaps That Could Ruin Your Business Overnight", published_date: "2026-06-08" },
  { id: "f4", slug: "business-travel-2026", section: "Travel", category: "travel", title: "Business Travel in 2026: Spend Less, Arrive Better", published_date: "2026-06-08" },
  { id: "f5", slug: "scaling-framework", section: "Business Consulting", category: "consulting", title: "Five Questions Every Business Owner Needs Before Scaling", published_date: "2026-06-08" },
  { id: "f6", slug: "retirement-planning-2026", section: "Retirement", category: "retirement", title: "Retirement Planning in Uncertain Markets: A 2026 Guide", published_date: "2026-06-08" },
];

export default function ArticlesFeed() {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    base44.entities.Article.filter({ is_published: true }, "-published_date", 24)
      .then((data) => {
        if (mounted) setArticles(data && data.length > 0 ? data : FALLBACK);
      })
      .catch(() => {
        if (mounted) setArticles(FALLBACK);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const categories = ["all", ...Object.keys(CATEGORY_META)];
  const filtered = activeCategory === "all" ? articles : articles.filter((a) => a.category === activeCategory);

  return (
    <section className="border-t border-slate-800/60 px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.32em] text-slate-500">Edition Archive</p>
            <h2 className="font-display text-4xl tracking-[-0.05em] text-white sm:text-5xl">Browse the stories.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const meta = CATEGORY_META[category];
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={"rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors " +
                    (activeCategory === category
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-slate-700 text-slate-400 hover:border-blue-500/50 hover:text-white")}
                >
                  {category === "all" ? "All" : meta.label}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-72 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/40" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500">No articles in this category yet.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => {
              const category = (article.category || "finance").toLowerCase();
              const meta = CATEGORY_META[category] || { label: article.section || category, color: "text-blue-300" };
              const image = article.image_url || CATEGORY_IMAGES[category] || CATEGORY_IMAGES.finance;
              return (
                <Link
                  key={article.id || article.slug}
                  to={"/magazine/article/" + (article.slug || article.id)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 transition-colors hover:border-blue-500/50 hover:bg-slate-900"
                >
                  <img src={image} alt={article.title || "Financial editorial"} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                  <div className="flex flex-1 flex-col p-5">
                    <p className={"mb-3 text-[10px] font-bold uppercase tracking-[0.22em] " + meta.color}>{meta.label}</p>
                    <h3 className="flex-1 text-base font-semibold leading-snug text-white transition-colors group-hover:text-blue-100">{article.title}</h3>
                    <div className="mt-4 border-t border-slate-800 pt-3 text-xs text-slate-500">
                      {article.published_date || article.date || ""}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
