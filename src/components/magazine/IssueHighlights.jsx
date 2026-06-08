import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Briefcase, Globe2 } from "lucide-react";

const articles = [
  { id: "markets", icon: BarChart3, section: "Markets", title: "Credit spreads, dry powder, and the return of price discipline", time: "8 min read" },
  { id: "venture", icon: Briefcase, section: "Venture", title: "Founder-led funds are becoming the new specialist boutiques", time: "11 min read" },
  { id: "wealth", icon: Globe2, section: "Wealth", title: "Family offices go direct: inside the co-investment renaissance", time: "9 min read" },
];

export default function IssueHighlights() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">Inside This Issue</p>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.05em] sm:text-5xl">High-signal reads for ambitious capital.</h2>
          </div>
          <p className="max-w-md text-muted-foreground">Concise reporting, sharp analysis, and executive-grade briefings designed for Monday morning action.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <motion.a id={article.id} href="#subscribe" key={article.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} className="group rounded-[1.5rem] border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                <div className="mb-12 flex items-center justify-between">
                  <div className="rounded-2xl bg-secondary p-3"><Icon className="h-5 w-5 text-primary" /></div>
                  <span className="text-xs text-muted-foreground">{article.time}</span>
                </div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{article.section}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] group-hover:text-primary">{article.title}</h3>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}