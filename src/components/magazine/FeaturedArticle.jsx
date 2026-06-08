import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturedArticle() {
  return (
    <section id="featured" className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-primary/5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-primary p-8 text-primary-foreground sm:p-12">
            <DollarSign className="h-10 w-10" />
            <p className="mt-16 text-sm uppercase tracking-[0.32em] opacity-70">Cover Story — Finance</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Building wealth on any income: the framework that actually works</h2>
          </div>
          <div className="p-8 sm:p-12">
            <div className="mb-8 flex flex-wrap gap-2">
              {["Personal Finance", "Wealth Building", "Investing", "Strategy"].map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{tag}</span>
              ))}
            </div>
            <p className="text-xl leading-9 text-foreground">
              Five principles that separate those who accumulate wealth from those who don't — regardless of starting salary, background, or access to capital.
            </p>
            <p className="mt-5 leading-7 text-muted-foreground">
              Our editors trace how ordinary earners build extraordinary balance sheets by mastering a simple but ruthless framework: spend less than you earn, invest the rest systematically, and never let tax inefficiency erode compound growth.
            </p>
            <Link to="/magazine/article/personal-finance-101" className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
              Read the full story <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}