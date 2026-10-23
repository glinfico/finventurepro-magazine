import React from "react";
import MagazineHeader from "@/components/magazine/MagazineHeader";
import MagazineHero from "@/components/magazine/MagazineHero";
import FeaturedArticle from "@/components/magazine/FeaturedArticle";
import MagazineLatestGrid from "@/components/magazine/MagazineLatestGrid";
import MagazineEditorNote from "@/components/magazine/MagazineEditorNote";
import MagazineConsulting from "@/components/magazine/MagazineConsulting";
import MagazineAds from "@/components/magazine/MagazineAds";
import MagazineSubscribe from "@/components/magazine/MagazineSubscribe";
import ArticlesFeed from "@/components/magazine/ArticlesFeed";
import MagazineFooter from "@/components/magazine/MagazineFooter";

export default function MagazineHome() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070D18] pb-14 text-white">
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-blue-500/20 bg-blue-950/95 px-5 py-2.5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p className="hidden text-sm font-semibold text-white sm:block">
            Need capital? GLINFICO Financial Operations Division — MCA, real estate, and M&amp;A funding.
          </p>
          <p className="text-sm font-semibold text-white sm:hidden">GLINFICO FOD — Capital access.</p>
          <a href="https://fod.glinfico.com" target="_blank" rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-blue-950 transition-opacity hover:opacity-90">
            fod.glinfico.com →
          </a>
        </div>
      </div>
      <MagazineHeader />
      <MagazineHero />
      <FeaturedArticle />
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
