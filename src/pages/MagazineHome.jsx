import React from "react";
import MagazineHeader from "@/components/magazine/MagazineHeader";
import MagazineHero from "@/components/magazine/MagazineHero";
import FeaturedArticle from "@/components/magazine/FeaturedArticle";
import IssueHighlights from "@/components/magazine/IssueHighlights";
import MarketSignal from "@/components/magazine/MarketSignal";
import MagazineLatestGrid from "@/components/magazine/MagazineLatestGrid";
import MagazineEditorNote from "@/components/magazine/MagazineEditorNote";
import MagazineConsulting from "@/components/magazine/MagazineConsulting";
import MagazineAds from "@/components/magazine/MagazineAds";
import MagazineSubscribe from "@/components/magazine/MagazineSubscribe";
import ArticlesFeed from "@/components/magazine/ArticlesFeed";
import MagazineFooter from "@/components/magazine/MagazineFooter";

export default function MagazineHome() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden pb-14">
      {/* FOD sticky banner */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-primary/95 backdrop-blur border-t border-white/10 py-2.5 px-5">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-primary-foreground hidden sm:block">
            Need capital? GLINFICO Financial Operations Division — fast access to MCA, real estate, and M&amp;A funding.
          </p>
          <p className="text-sm font-semibold text-primary-foreground sm:hidden">GLINFICO FOD — Fast capital access.</p>
          <a href="https://fod.glinfico.com" target="_blank" rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 rounded-full bg-primary-foreground px-4 py-1.5 text-xs font-bold text-primary hover:opacity-90 transition-opacity">
            fod.glinfico.com →
          </a>
        </div>
      </div>
      <MagazineHeader />
      <MagazineHero />
      <FeaturedArticle />
      <IssueHighlights />
      <MarketSignal />
      <MagazineLatestGrid />
      <ArticlesFeed />
      <MagazineEditorNote />
      <MagazineConsulting />
      <MagazineAds />
      <MagazineSubscribe />
      <MagazineFooter />
    </main>
  );
}