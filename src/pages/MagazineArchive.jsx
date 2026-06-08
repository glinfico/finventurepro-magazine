import React, { useState } from "react";
import { Link } from "react-router-dom";
import MagazineHeader from "@/components/magazine/MagazineHeader";
import MagazineFooter from "@/components/magazine/MagazineFooter";
import SubscribePanel from "@/components/magazine/SubscribePanel";
import { BarChart3, Briefcase, Globe2, TrendingUp, Landmark, DollarSign, Clock } from "lucide-react";
import { motion } from "framer-motion";

const allArticles = [
  { slug: "private-market-os", section: "Cover Story", category: "markets", icon: Landmark, title: "The New Private Market Operating System", subtitle: "How top-tier investors are replacing quarterly intuition with live underwriting systems", readTime: "14 min", date: "June 2026" },
  { slug: "credit-spreads-dry-powder", section: "Markets", category: "markets", icon: BarChart3, title: "Credit Spreads, Dry Powder, and the Return of Price Discipline", subtitle: "Why the market's most important reset is happening in credit, not equity", readTime: "8 min", date: "June 2026" },
  { slug: "founder-led-funds", section: "Venture", category: "venture", icon: Briefcase, title: "Founder-Led Funds Are Becoming the New Specialist Boutiques", subtitle: "The rise of operator-turned-investor is reshaping early-stage VC dynamics", readTime: "11 min", date: "June 2026" },
  { slug: "family-office-coinvestment", section: "Wealth", category: "wealth", icon: Globe2, title: "Family Offices Go Direct: Inside the Co-Investment Renaissance", subtitle: "Multi-generational wealth holders are cutting out the middleman — and learning fast", readTime: "9 min", date: "June 2026" },
  { slug: "mca-market-2026", section: "Funding Intelligence", category: "markets", icon: DollarSign, title: "MCA Market in 2026: Speed Is No Longer the Only Edge", subtitle: "How the merchant cash advance industry is evolving beyond 24-hour approvals", readTime: "7 min", date: "June 2026" },
  { slug: "real-estate-bridge-lending", section: "Real Estate Capital", category: "markets", icon: TrendingUp, title: "Bridge Lending in a Rate Plateau: Opportunities for Patient Capital", subtitle: "Why the current rate environment is creating asymmetric entry points in commercial bridge finance", readTime: "10 min", date: "June 2026" },
];

const categories = ["All", "markets", "venture", "wealth"];

const categoryLabels = { all: "All", markets: "Markets", venture: "Venture", wealth: "Wealth" };

const categoryColors = {
  markets: "bg-blue-500/20 text-blue-300",
  venture: "bg-purple-500/20 text-purple-300",
  wealth: "bg-green-500/20 text-green-300",
};

export default function MagazineArchive() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? allArticles
    : allArticles.filter(a => a.category === activeCategory);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MagazineHeader />

      <div className="px-5 pt-32 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground mb-3">FinVenturePro Archive</p>
            <h1 className="font-display text-5xl tracking-[-0.05em] sm:text-6xl">Every Article.</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Browse all issues, reports, and intelligence briefs from the FinVenturePro editorial team.</p>
          </motion.div>

          {/* Category filter */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${activeCategory === cat ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}
              >
                {cat === "All" ? "All Articles" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Article grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, i) => {
              const Icon = article.icon;
              return (
                <motion.div key={article.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/magazine/article/${article.slug}`}
                    className="group flex flex-col h-full rounded-[1.5rem] border border-border bg-card p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all">
                    <div className="mb-6 flex items-start justify-between">
                      <div className="rounded-2xl bg-secondary p-3"><Icon className="h-5 w-5 text-primary" /></div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColors[article.category] || ""}`}>{article.section}</span>
                    </div>
                    <h3 className="flex-1 text-lg font-semibold leading-snug tracking-[-0.02em] group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{article.subtitle}</p>
                    <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                      <span>{article.date}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <SubscribePanel />
      <MagazineFooter />
    </main>
  );
}