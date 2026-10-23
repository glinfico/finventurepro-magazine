import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

const CATEGORY_IMAGES = {
  finance: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
  economy: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
  insurance: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80",
  travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80",
  consulting: "https://images.unsplash.com/photo-1553484771-047a44eee27b?w=1600&q=80",
  retirement: "https://images.unsplash.com/photo-1559526324-593bc0738d25?w=1600&q=80",
};

const FALLBACK_ARTICLE = {
  slug: "personal-finance-101",
  section: "Finance",
  category: "finance",
  title: "Building Wealth on Any Income: The Framework That Actually Works",
  intro: "A clear editorial framework for making financial decisions with a long-term view.",
};

export default function FeaturedArticle() {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let mounted = true;
    base44.entities.Article.filter({ is_published: true }, "-published_date", 1)
      .then((items) => {
        if (mounted && items && items.length) setArticle(items[0]);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const story = article || FALLBACK_ARTICLE;
  const category = (story.category || "finance").toLowerCase();
  const image = story.image_url || CATEGORY_IMAGES[category] || CATEGORY_IMAGES.finance;
  const section = story.section || category;
  const slug = story.slug || story.id || FALLBACK_ARTICLE.slug;

  return (
    <section id="featured" className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to={"/magazine/article/" + slug}
          className="group grid overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 transition-colors hover:border-blue-500/50 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-h-64 overflow-hidden bg-slate-900">
            <img src={image} alt={story.title || "Featured financial article"} loading="lazy" className="h-full min-h-64 w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]" />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-blue-300">Featured story · {section}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">{story.title}</h2>
            <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition-colors group-hover:text-blue-200">
              Read story <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
