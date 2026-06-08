import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, DollarSign, BarChart3, ShieldCheck, Plane, Briefcase, Zap } from "lucide-react";
import { base44 } from "@/api/base44Client";

const categoryIcon = {
  finance:    DollarSign,
  economy:    BarChart3,
  insurance:  ShieldCheck,
  travel:     Plane,
  consulting: Briefcase,
  markets: BarChart3,
  venture: Briefcase,
  wealth: DollarSign,
  funding: DollarSign,
  "real-estate": BarChart3,
};

const FALLBACK = [
  { slug: "personal-finance-101", section: "Finance", category: "finance", title: "Building Wealth on Any Income: The Framework That Actually Works", intro: "Five principles that separate those who accumulate from those who don't, regardless of salary.", read_time: "9 min", published_date: "2026-06-08" },
  { slug: "inflation-decoded", section: "Economy", category: "economy", title: "Inflation Decoded: What the Numbers Never Tell You", intro: "Why headline CPI misses the picture most consumers and investors actually live in.", read_time: "7 min", published_date: "2026-06-08" },
  { slug: "insurance-gaps", section: "Insurance", category: "insurance", title: "The Insurance Gaps That Could Ruin Your Business Overnight", intro: "Most SMBs carry inadequate coverage in exactly the three areas most likely to cause catastrophic loss.", read_time: "8 min", published_date: "2026-06-08" },
  { slug: "business-travel-reimagined", section: "Travel", category: "travel", title: "Business Travel in 2026: How to Spend Less and Arrive Better", intro: "Points optimization, premium cabin access, and the new rules of corporate travel policy.", read_time: "6 min", published_date: "2026-06-08" },
  { slug: "consulting-growth", section: "Business Consulting", category: "consulting", title: "The Five-Question Framework Every Business Owner Needs Before Scaling", intro: "Before you hire, expand, or raise capital, answer these. Your growth trajectory depends on it.", read_time: "11 min", published_date: "2026-06-08" },
  { slug: "credit-economy-2026", section: "Economy", category: "economy", title: "The Credit Cycle Is Turning: What It Means for Your Portfolio", intro: "Rising spreads, tightening conditions, and what history says about the next 18 months.", read_time: "10 min", published_date: "2026-06-08" },
];

export default function MagazineLatestGrid() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Article.filter({ is_published: true }, "-published_date", 6)
      .then(data => {
        setArticles(data && data.length > 0 ? data : FALLBACK);
        setLoading(false);
      })
      .catch(() => {
        setArticles(FALLBACK);
        setLoading(false);
      });
  }, []);

  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">Latest</p>
              <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                <Zap className="h-3 w-3" /> AI-Updated Daily
              </span>
            </div>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.05em] sm:text-5xl">Fresh intelligence.</h2>
          </div>
          <Link to="/magazine/archive" className="text-sm font-semibold text-primary hover:underline hidden sm:block">
            Browse all articles →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-[1.5rem] border border-border bg-card p-7 animate-pulse h-56" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((article, i) => {
              const Icon = categoryIcon[article.category] || BarChart3;
              return (
                <motion.div key={article.slug || article.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Link to={`/magazine/article/${article.slug || article.id}`}
                    className="group flex flex-col h-full rounded-[1.5rem] border border-border bg-card p-7 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all">
                    <div className="mb-6 rounded-2xl bg-secondary p-3 w-fit">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-3">{article.section}</p>
                    <h3 className="flex-1 text-xl font-semibold leading-snug tracking-[-0.02em] group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.intro || article.subtitle}</p>
                    <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground border-t border-border pt-4">
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
          <Link to="/magazine/archive" className="text-sm font-semibold text-primary hover:underline">Browse all articles →</Link>
        </div>
      </div>
    </section>
  );
}