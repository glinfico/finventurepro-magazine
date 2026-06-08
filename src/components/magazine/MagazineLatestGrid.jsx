import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, DollarSign, TrendingUp } from "lucide-react";

const latest = [
  {
    slug: "mca-market-2026",
    section: "Funding Intelligence",
    icon: DollarSign,
    title: "MCA Market in 2026: Speed Is No Longer the Only Edge",
    excerpt: "How the merchant cash advance industry is evolving beyond 24-hour approvals into data-driven underwriting.",
    readTime: "7 min",
    date: "June 2026",
  },
  {
    slug: "real-estate-bridge-lending",
    section: "Real Estate Capital",
    icon: TrendingUp,
    title: "Bridge Lending in a Rate Plateau",
    excerpt: "Why the current rate environment is creating asymmetric entry points in commercial bridge finance.",
    readTime: "10 min",
    date: "June 2026",
  },
  {
    slug: "family-office-coinvestment",
    section: "Wealth",
    icon: TrendingUp,
    title: "Family Offices Go Direct",
    excerpt: "Multi-generational wealth holders are cutting out the middleman — and learning fast.",
    readTime: "9 min",
    date: "June 2026",
  },
];

export default function MagazineLatestGrid() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">Latest</p>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.05em] sm:text-5xl">Fresh intelligence.</h2>
          </div>
          <Link to="/magazine/archive" className="text-sm font-semibold text-primary hover:underline hidden sm:block">
            Browse all articles →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {latest.map((article, i) => {
            const Icon = article.icon;
            return (
              <motion.div key={article.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Link to={`/magazine/article/${article.slug}`}
                  className="group flex flex-col h-full rounded-[1.5rem] border border-border bg-card p-7 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all">
                  <div className="mb-6 rounded-2xl bg-secondary p-3 w-fit">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-3">{article.section}</p>
                  <h3 className="flex-1 text-xl font-semibold leading-snug tracking-[-0.02em] group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                  <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground border-t border-border pt-4">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link to="/magazine/archive" className="text-sm font-semibold text-primary hover:underline">Browse all articles →</Link>
        </div>
      </div>
    </section>
  );
}