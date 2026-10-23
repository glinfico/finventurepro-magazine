import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

const CATEGORY_COLOR = {
  finance: "text-emerald-300",
  economy: "text-blue-300",
  insurance: "text-violet-300",
  travel: "text-amber-300",
  consulting: "text-rose-300",
  retirement: "text-teal-300",
  markets: "text-blue-300",
};

const CATEGORY_IMAGES = {
  finance: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  economy: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  insurance: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
  travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
  consulting: "https://images.unsplash.com/photo-1553484771-047a44eee27b?w=1200&q=80",
  retirement: "https://images.unsplash.com/photo-1559526324-593bc0738d25?w=1200&q=80",
  markets: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&q=80",
};

const FALLBACK = [
  { slug: "personal-finance-101", section: "Finance", category: "finance", title: "Building Wealth on Any Income: The Framework That Actually Works", published_date: "2026-06-08" },
  { slug: "inflation-decoded", section: "Economy", category: "economy", title: "Inflation Decoded: What the Numbers Never Tell You", published_date: "2026-06-08" },
  { slug: "insurance-gaps", section: "Insurance", category: "insurance", title: "The Insurance Gaps That Could Ruin Your Business Overnight", published_date: "2026-06-08" },
  { slug: "business-travel-reimagined", section: "Travel", category: "travel", title: "Business Travel in 2026: How to Spend Less and Arrive Better", published_date: "2026-06-08" },
  { slug: "consulting-growth", section: "Business Consulting", category: "consulting", title: "The Five-Question Framework Every Business Owner Needs Before Scaling", published_date: "2026-06-08" },
  { slug: "credit-economy-2026", section: "Economy", category: "economy", title: "The Credit Cycle Is Turning: What It Means for Your Portfolio", published_date: "2026-06-08" },
];

export default function MagazineLatestGrid() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    base44.entities.Article.filter({ is_published: true }, "-published_date", 6)
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

  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.32em] text-slate-500">Latest Edition</p>
            <h2 className="font-display text-4xl tracking-[-0.05em] text-white sm:text-5xl">Latest intelligence.</h2>
          </div>
          <Link to="/magazine/archive" className="hidden text-sm font-semibold text-blue-300 transition-colors hover:text-blue-200 sm:block">
            Browse archive →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-72 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/40" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((article) => {
              const category = (article.category || "finance").toLowerCase();
              const image = article.image_url || CATEGORY_IMAGES[category] || CATEGORY_IMAGES.finance;
              const color = CATEGORY_COLOR[category] || "text-blue-300";
              return (
                <Link
                  key={article.id || article.slug}
                  to={"/magazine/article/" + (article.slug || article.id)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 transition-colors hover:border-blue-500/50 hover:bg-slate-900"
                >
                  <img src={image} alt={article.title || "Financial editorial"} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className={"mb-3 text-[10px] font-bold uppercase tracking-[0.24em] " + color}>{article.section || category}</p>
                    <h3 className="flex-1 text-lg font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-blue-100">
                      {article.title}
                    </h3>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{article.read_time || article.readTime || "Read article"}</span>
                      <span>{article.published_date || article.date || ""}</span>
                      <ArrowUpRight className="h-4 w-4 text-blue-300 opacity-70" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link to="/magazine/archive" className="text-sm font-semibold text-blue-300 hover:text-blue-200">Browse all articles →</Link>
        </div>
      </div>
    </section>
  );
}
